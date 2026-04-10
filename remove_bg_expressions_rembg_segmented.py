import argparse
import os
import sys
import shutil
from collections import deque
from functools import lru_cache

import numpy as np
from rembg import remove, new_session
from rembg.sessions import sessions_names
from PIL import Image

EXPRESSIONS_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS", "expressions")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS_processed", "expressions")
GAME_CHARS_DIR = os.path.join(os.path.dirname(__file__), "game", "public", "characters", "expressions")

MIN_OUTPUT_COUNT = 1
MAX_OUTPUT_COUNT = 4
DEFAULT_MODEL_NAME = "isnet-anime"
CRAZY_MODEL_NAMES = (
    "isnet-anime",
    "u2net",
    "isnet-general-use",
    "birefnet-massive",
    "bria-rmbg",
)
AVAILABLE_MODEL_NAMES = tuple(sorted(sessions_names))
DEFAULT_STRENGTH = 1.0
MIN_STRENGTH = 0.25
MAX_STRENGTH = 3.0
ALPHA_THRESHOLD = 8
SOURCE_FOREGROUND_THRESHOLD = 245
MIN_COMPONENT_AREA = 48
MIN_COMPONENT_AREA_RATIO = 0.00005
COLUMN_SMOOTH_RATIO = 0.02
ACTIVE_COLUMN_THRESHOLD_RATIO = 0.02
INTERNAL_GAP_MERGE_RATIO = 0.02
SEGMENT_PADDING_RATIO = 0.05
MIN_SPLIT_WIDTH_RATIO = 0.12

NEIGHBORS_8 = (
    (-1, -1),
    (-1, 0),
    (-1, 1),
    (0, -1),
    (0, 1),
    (1, -1),
    (1, 0),
    (1, 1),
)


def clamp(value, min_value, max_value):
    return max(min_value, min(max_value, value))


@lru_cache(maxsize=None)
def get_session(model_name):
    print(f"Initializing {model_name} model...")
    return new_session(model_name)


def parse_cli_args(argv):
    parser = argparse.ArgumentParser(
        description="Split expression sheets into character crops and remove the background from each crop."
    )
    parser.add_argument(
        "sprite_ids",
        nargs="*",
        help="Optional sprite IDs to generate, such as: 97 98",
    )
    parser.add_argument(
        "--model",
        choices=AVAILABLE_MODEL_NAMES,
        default=DEFAULT_MODEL_NAME,
        help=f"rembg model to use. Default: {DEFAULT_MODEL_NAME}",
    )
    parser.add_argument(
        "--crazy",
        action="store_true",
        help=(
            "Try multiple high-quality models and keep the best result per sprite. "
            f"Models: {', '.join(CRAZY_MODEL_NAMES)}"
        ),
    )
    parser.add_argument(
        "--strenght",
        "--strength",
        dest="strength",
        type=float,
        default=DEFAULT_STRENGTH,
        help=(
            "Removal aggressiveness. Lower values keep more of the image, higher values cut more. "
            f"Default: {DEFAULT_STRENGTH}"
        ),
    )

    args = parser.parse_args(argv[1:])
    requested_sprite_names = {name.strip() for name in args.sprite_ids if name.strip()}
    if not requested_sprite_names:
        requested_sprite_names = None

    args.requested_sprite_names = requested_sprite_names
    args.strength = clamp(args.strength, MIN_STRENGTH, MAX_STRENGTH)
    args.model_names = list(CRAZY_MODEL_NAMES if args.crazy else [args.model])
    return args


def build_processing_settings(strength):
    alpha_erode_size = int(round(clamp(2.0 * strength, 0.0, 6.0)))
    alpha_threshold = int(round(clamp(ALPHA_THRESHOLD * strength, 1.0, 32.0)))
    alpha_background_threshold = int(round(clamp(20.0 * strength, 5.0, 80.0)))

    return {
        "strength": strength,
        "alpha_threshold": alpha_threshold,
        "alpha_matting_erode_size": alpha_erode_size,
        "alpha_matting_background_threshold": alpha_background_threshold,
    }


def parse_output_names(filename):
    stem, ext = os.path.splitext(filename)
    if ext.lower() != ".png":
        raise ValueError(f"Unsupported file type: {filename}")

    names = [part.strip() for part in stem.split(",") if part.strip()]
    if not (MIN_OUTPUT_COUNT <= len(names) <= MAX_OUTPUT_COUNT):
        raise ValueError(
            f"Expected between {MIN_OUTPUT_COUNT} and {MAX_OUTPUT_COUNT} comma-separated output names in '{filename}', got {len(names)}"
        )

    return names


def remove_background(image, processing_settings, model_name):
    output_image = remove(
        image,
        session=get_session(model_name),
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=processing_settings["alpha_matting_background_threshold"],
        alpha_matting_erode_size=processing_settings["alpha_matting_erode_size"],
    )

    return output_image.convert("RGBA")


def alpha_mask_from_image(image, alpha_threshold):
    alpha = np.array(image.getchannel("A"))
    return alpha > alpha_threshold


def source_foreground_mask_from_image(image):
    rgb = np.array(image.convert("RGB"))
    return np.any(rgb < SOURCE_FOREGROUND_THRESHOLD, axis=2)


def boundary_mask_from_foreground_mask(mask):
    padded = np.pad(mask, 1, mode="constant", constant_values=False)
    interior = padded[1:-1, 1:-1].copy()

    for dy, dx in NEIGHBORS_8:
        interior &= padded[1 + dy : 1 + dy + mask.shape[0], 1 + dx : 1 + dx + mask.shape[1]]

    return mask & ~interior


def smooth_column_activity(column_activity, width):
    window = max(5, round(width * COLUMN_SMOOTH_RATIO))
    if window % 2 == 0:
        window += 1

    kernel = np.ones(window, dtype=np.float32) / window
    return np.convolve(column_activity.astype(np.float32), kernel, mode="same")


def find_connected_components(mask):
    height, width = mask.shape
    visited = np.zeros((height, width), dtype=bool)
    components = []

    min_area = max(MIN_COMPONENT_AREA, round(height * width * MIN_COMPONENT_AREA_RATIO))

    for start_y, start_x in np.argwhere(mask):
        start_y = int(start_y)
        start_x = int(start_x)
        if visited[start_y, start_x]:
            continue

        queue = deque([(start_y, start_x)])
        visited[start_y, start_x] = True
        pixels = []
        min_x = max_x = start_x
        min_y = max_y = start_y

        while queue:
            y, x = queue.popleft()
            pixels.append((y, x))
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)

            for dy, dx in NEIGHBORS_8:
                ny = y + dy
                nx = x + dx
                if 0 <= ny < height and 0 <= nx < width and mask[ny, nx] and not visited[ny, nx]:
                    visited[ny, nx] = True
                    queue.append((ny, nx))

        area = len(pixels)
        if area < min_area:
            for y, x in pixels:
                mask[y, x] = False
            continue

        components.append(
            {
                "left": min_x,
                "right": max_x,
                "top": min_y,
                "bottom": max_y,
                "area": area,
                "center_x": (min_x + max_x) / 2.0,
            }
        )

    return components, mask


def find_active_segments(smoothed_activity, image_width):
    peak = float(smoothed_activity.max())
    if peak <= 0.0:
        return []

    threshold = max(2.0, peak * ACTIVE_COLUMN_THRESHOLD_RATIO)
    active_columns = smoothed_activity >= threshold
    segments = []
    start = None

    for x, is_active in enumerate(active_columns):
        if is_active and start is None:
            start = x
        elif not is_active and start is not None:
            segments.append([start, x - 1])
            start = None

    if start is not None:
        segments.append([start, image_width - 1])

    if not segments:
        return []

    max_internal_gap = max(4, round(image_width * INTERNAL_GAP_MERGE_RATIO))
    merged_segments = [segments[0]]
    for left, right in segments[1:]:
        previous_left, previous_right = merged_segments[-1]
        gap = left - previous_right - 1
        if gap <= max_internal_gap:
            merged_segments[-1][1] = right
        else:
            merged_segments.append([left, right])

    return merged_segments


def merge_closest_segments(segments, target_count):
    merged = [segment[:] for segment in segments]
    while len(merged) > target_count:
        smallest_gap = None
        smallest_index = None

        for index in range(len(merged) - 1):
            gap = merged[index + 1][0] - merged[index][1] - 1
            if smallest_gap is None or gap < smallest_gap:
                smallest_gap = gap
                smallest_index = index

        merged[smallest_index][1] = merged[smallest_index + 1][1]
        del merged[smallest_index + 1]

    return merged


def split_widest_segment(segments, smoothed_activity, target_count, image_width):
    split_segments = [segment[:] for segment in segments]
    min_split_width = max(12, round(image_width * MIN_SPLIT_WIDTH_RATIO))

    while len(split_segments) < target_count:
        best_index = None
        best_split = None
        best_score = None

        for index, (left, right) in enumerate(split_segments):
            width = right - left + 1
            if width < min_split_width:
                continue

            margin = max(3, width // 8)
            search_left = left + margin
            search_right = right - margin
            if search_left >= search_right:
                split_at = left + (width // 2)
                valley_depth = 0.0
            else:
                segment_activity = smoothed_activity[left : right + 1]
                peak = float(segment_activity.max())
                valley_slice = smoothed_activity[search_left : search_right + 1]
                valley_offset = int(np.argmin(valley_slice))
                split_at = search_left + valley_offset
                valley_value = float(valley_slice[valley_offset])
                valley_depth = peak - valley_value

            score = (width * 1000.0) + valley_depth
            if best_score is None or score > best_score:
                best_score = score
                best_index = index
                best_split = split_at

        if best_index is None or best_split is None:
            raise ValueError("Could not infer enough character regions from the image")

        left, right = split_segments[best_index]
        if best_split <= left or best_split >= right:
            best_split = left + ((right - left + 1) // 2)

        split_segments[best_index] = [left, best_split]
        split_segments.insert(best_index + 1, [best_split + 1, right])

    return split_segments


def infer_character_segments(mask, expected_count):
    _, width = mask.shape
    column_activity = mask.sum(axis=0)
    if float(column_activity.max()) <= 0.0:
        raise ValueError("No foreground pixels remained after background removal")

    smoothed_activity = smooth_column_activity(column_activity, width)
    segments = find_active_segments(smoothed_activity, width)

    if not segments:
        raise ValueError("Could not detect any character regions")

    if len(segments) > expected_count:
        segments = merge_closest_segments(segments, expected_count)

    if len(segments) < expected_count:
        segments = split_widest_segment(segments, smoothed_activity, expected_count, width)

    return segments


def crop_character_image(image, mask, segment, components):
    image_width, image_height = image.size
    segment_left, segment_right = segment

    if components:
        left = min(component["left"] for component in components)
        right = max(component["right"] for component in components)
        top = min(component["top"] for component in components)
        bottom = max(component["bottom"] for component in components)
    else:
        segment_mask = mask[:, segment_left : segment_right + 1]
        if not np.any(segment_mask):
            raise ValueError("A detected character region did not contain any foreground pixels")

        rows = np.where(segment_mask.any(axis=1))[0]
        cols = np.where(segment_mask.any(axis=0))[0]
        left = segment_left + int(cols[0])
        right = segment_left + int(cols[-1])
        top = int(rows[0])
        bottom = int(rows[-1])

    bbox_width = right - left + 1
    bbox_height = bottom - top + 1
    pad_x = max(4, round(bbox_width * SEGMENT_PADDING_RATIO))
    pad_y = max(4, round(bbox_height * SEGMENT_PADDING_RATIO))

    crop_left = max(0, left - pad_x)
    crop_right = min(image_width - 1, right + pad_x)
    crop_top = max(0, top - pad_y)
    crop_bottom = min(image_height - 1, bottom + pad_y)

    return image.crop((crop_left, crop_top, crop_right + 1, crop_bottom + 1))


def crop_source_segment(image, mask, segment):
    segment_left, segment_right = segment
    segment_mask = mask[:, segment_left : segment_right + 1]
    if not np.any(segment_mask):
        raise ValueError("A detected source region did not contain any visible foreground pixels")

    rows = np.where(segment_mask.any(axis=1))[0]
    cols = np.where(segment_mask.any(axis=0))[0]

    left = segment_left + int(cols[0])
    right = segment_left + int(cols[-1])
    top = int(rows[0])
    bottom = int(rows[-1])

    return crop_character_image(
        image,
        mask,
        segment,
        [
            {
                "left": left,
                "right": right,
                "top": top,
                "bottom": bottom,
            }
        ],
    )


def score_model_candidate(source_crop, removed_background, cleaned_mask, processing_settings):
    alpha = np.array(removed_background.getchannel("A"), dtype=np.float32)
    image_area = float(alpha.size)
    if image_area <= 0.0:
        return float("-inf")

    alpha_ratio = alpha / 255.0
    source_rgb = np.array(source_crop.convert("RGB"), dtype=np.float32)
    bright_mask = source_rgb.mean(axis=2) >= 240.0
    boundary_mask = boundary_mask_from_foreground_mask(cleaned_mask)
    bright_boundary_mask = boundary_mask & bright_mask
    bright_halo_mask = (alpha > 0.0) & (alpha < 255.0) & bright_mask

    detail_score = float(alpha_ratio.sum() / image_area)
    bright_boundary_penalty = float(alpha_ratio[bright_boundary_mask].sum() / image_area)
    bright_halo_penalty = float(alpha_ratio[bright_halo_mask].sum() / image_area)

    return detail_score - (bright_boundary_penalty * 2.5) - (bright_halo_penalty * 1.5)


def build_candidate_result(source_crop, processing_settings, model_name):
    removed_background = remove_background(source_crop, processing_settings, model_name)
    foreground_mask = alpha_mask_from_image(removed_background, processing_settings["alpha_threshold"])
    components, cleaned_mask = find_connected_components(foreground_mask.copy())

    if components:
        score = score_model_candidate(source_crop, removed_background, cleaned_mask, processing_settings)
    else:
        score = float("-inf")

    return {
        "model_name": model_name,
        "removed_background": removed_background,
        "components": components,
        "cleaned_mask": cleaned_mask,
        "score": score,
    }


def select_best_candidate(source_crop, processing_settings, model_names):
    candidates = [build_candidate_result(source_crop, processing_settings, model_name) for model_name in model_names]
    return max(candidates, key=lambda candidate: candidate["score"])


def should_process_sheet(output_names, requested_sprite_names):
    if requested_sprite_names is None:
        return True

    return any(name in requested_sprite_names for name in output_names)


def process_expression_sheet(input_path, processing_settings, requested_sprite_names=None):
    filename = os.path.basename(input_path)
    print(f"Processing {filename}...")

    try:
        output_names = parse_output_names(filename)
        requested_in_sheet = set(output_names)
        if requested_sprite_names is not None:
            requested_in_sheet &= requested_sprite_names

        if not requested_in_sheet:
            print("  Skipping: no requested sprite IDs in this sheet.")
            return None

        input_image = Image.open(input_path).convert("RGBA")
        source_mask = source_foreground_mask_from_image(input_image)
        segments = infer_character_segments(source_mask, len(output_names))

        print(f"  Detected {len(segments)} character region(s) for {len(output_names)} output file(s)...")

        for output_name, segment in zip(output_names, segments):
            if output_name not in requested_in_sheet:
                continue

            output_filename = f"{output_name}.png"
            output_path = os.path.join(OUTPUT_DIR, output_filename)
            print(f"  Saving {output_filename}...")

            source_crop = crop_source_segment(input_image, source_mask, segment)
            candidate = select_best_candidate(source_crop, processing_settings, processing_settings["model_names"])
            removed_background = candidate["removed_background"]
            components = candidate["components"]
            cleaned_mask = candidate["cleaned_mask"]
            if len(processing_settings["model_names"]) > 1:
                print(f"    Chosen model: {candidate['model_name']} (score={candidate['score']:.4f})")

            if components:
                character_image = crop_character_image(
                    removed_background,
                    cleaned_mask,
                    [0, removed_background.size[0] - 1],
                    components,
                )
            else:
                character_image = removed_background

            character_image.save(output_path)

            if os.path.isdir(GAME_CHARS_DIR):
                shutil.copy2(output_path, os.path.join(GAME_CHARS_DIR, output_filename))

        return True
    except Exception as error:
        print(f"  Error processing {filename}: {error}")
        return False


def main():
    if not os.path.isdir(EXPRESSIONS_DIR):
        print(f"Error: {EXPRESSIONS_DIR} not found")
        sys.exit(1)

    args = parse_cli_args(sys.argv)
    requested_sprite_names = args.requested_sprite_names
    processing_settings = build_processing_settings(args.strength)
    processing_settings["model_names"] = args.model_names

    files = [
        filename
        for filename in os.listdir(EXPRESSIONS_DIR)
        if filename.lower().endswith(".png")
    ]

    if requested_sprite_names is not None:
        files = [
            filename
            for filename in files
            if should_process_sheet(parse_output_names(filename), requested_sprite_names)
        ]

    if not files:
        if requested_sprite_names is None:
            print("No PNG files found in CHARACTERS/expressions/")
        else:
            requested_list = ", ".join(sorted(requested_sprite_names))
            print(f"No expression sheets found for requested sprite IDs: {requested_list}")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(GAME_CHARS_DIR, exist_ok=True)

    print(
        "Using rembg strength "
        f"{processing_settings['strength']:.2f} "
        f"(erode={processing_settings['alpha_matting_erode_size']}, "
        f"bg_threshold={processing_settings['alpha_matting_background_threshold']}, "
        f"alpha_threshold={processing_settings['alpha_threshold']})"
    )
    if len(processing_settings["model_names"]) == 1:
        print(f"Using rembg model: {processing_settings['model_names'][0]}")
    else:
        print(f"Using crazy model sweep: {', '.join(processing_settings['model_names'])}")

    processed_count = 0
    for filename in files:
        input_path = os.path.join(EXPRESSIONS_DIR, filename)
        result = process_expression_sheet(input_path, processing_settings, requested_sprite_names)
        if result is True:
            processed_count += 1

    print(f"\nDone! {processed_count} expression sheet(s) processed.")


if __name__ == "__main__":
    main()