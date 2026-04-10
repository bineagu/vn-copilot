import os
import sys
import shutil
import numpy as np
from rembg import remove, new_session
from PIL import Image, ImageFilter

EXPRESSIONS_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS", "expressions")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS_processed", "expressions")
GAME_CHARS_DIR = os.path.join(os.path.dirname(__file__), "game", "public", "characters", "expressions")
SLICE_COUNT = 4
EDGE_BLUR_RADIUS = 4.0
EDGE_DECONTAMINATE_STRENGTH = 1.0
MASK_IGNORE_CONTOUR_PX = 3
PRESERVE_SOURCE_THRESHOLD = 245

# Initialize the anime-specific model
print("Initializing isnet-anime model...")
session = new_session("isnet-anime") #new_session("isnet-anime")


def parse_output_names(filename):
    stem, ext = os.path.splitext(filename)
    if ext.lower() != ".png":
        raise ValueError(f"Unsupported file type: {filename}")

    names = [part.strip() for part in stem.split(",") if part.strip()]
    if len(names) != SLICE_COUNT:
        raise ValueError(
            f"Expected {SLICE_COUNT} comma-separated output names in '{filename}', got {len(names)}"
        )

    return names


def split_vertical_slices(image, slice_count):
    width, height = image.size
    slices = []

    base_slice_width = round(width / slice_count)
    half_slice = base_slice_width / 2.0

    # Detect non-white content columns so each lane can be centered on its subject.
    rgb_array = np.array(image.convert("RGB"))
    non_white_mask = np.any(rgb_array < PRESERVE_SOURCE_THRESHOLD, axis=2)
    column_activity = non_white_mask.sum(axis=0).astype(np.float32)

    # Smooth column activity to avoid tiny spikes driving center selection.
    smooth_window = max(3, round(base_slice_width * 0.08))
    if smooth_window % 2 == 0:
        smooth_window += 1
    kernel = np.ones(smooth_window, dtype=np.float32) / smooth_window
    smoothed_activity = np.convolve(column_activity, kernel, mode="same")

    search_half_width = round(base_slice_width * 0.7)
    min_center = round(half_slice)
    max_center = width - round(half_slice)
    detected_centers = []

    for index in range(slice_count):
        nominal_center = round((index + 0.5) * width / slice_count)
        search_left = max(0, nominal_center - search_half_width)
        search_right = min(width, nominal_center + search_half_width)

        local_activity = smoothed_activity[search_left:search_right]
        if local_activity.size == 0 or float(local_activity.max()) <= 0.0:
            chosen_center = nominal_center
        else:
            peak_offset = int(np.argmax(local_activity))
            peak_value = float(local_activity[peak_offset])
            chosen_center = search_left + peak_offset

            band_mask = local_activity >= (peak_value * 0.35)
            if np.any(band_mask):
                band_x = np.arange(search_left, search_right)[band_mask].astype(np.float32)
                band_w = local_activity[band_mask]
                if float(band_w.sum()) > 0.0:
                    chosen_center = int(round(float((band_x * band_w).sum() / band_w.sum())))

        chosen_center = max(min_center, min(max_center, chosen_center))
        detected_centers.append(chosen_center)

    for center in detected_centers:
        left = round(center - half_slice)
        right = left + base_slice_width

        if left < 0:
            right -= left
            left = 0
        if right > width:
            left -= right - width
            right = width

        left = max(0, left)
        right = min(width, right)

        slice_image = image.crop((left, 0, right, height))
        if slice_image.width != base_slice_width:
            canvas = Image.new("RGBA", (base_slice_width, height), (255, 255, 255, 255))
            paste_x = (base_slice_width - slice_image.width) // 2
            canvas.paste(slice_image, (paste_x, 0))
            slice_image = canvas

        slices.append(slice_image)

    return slices



def process_slice(slice_image, output_path):
    output_image = remove(
        slice_image,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=20,
        alpha_matting_erode_size=2,
    )

   
    output_image.save(output_path)


def process_expression_sheet(input_path):
    filename = os.path.basename(input_path)
    print(f"Processing {filename}...")

    try:
        output_names = parse_output_names(filename)
        input_image = Image.open(input_path).convert("RGBA")
        slices = split_vertical_slices(input_image, SLICE_COUNT)

        for output_name, slice_image in zip(output_names, slices):
            output_filename = f"{output_name}.png"
            output_path = os.path.join(OUTPUT_DIR, output_filename)
            print(f"  Saving slice as {output_filename}...")
            process_slice(slice_image, output_path)

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

    files = [
        filename
        for filename in os.listdir(EXPRESSIONS_DIR)
        if filename.lower().endswith(".png")
    ]
    if not files:
        print("No PNG files found in CHARACTERS/expressions/")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(GAME_CHARS_DIR, exist_ok=True)

    processed_count = 0
    for filename in files:
        input_path = os.path.join(EXPRESSIONS_DIR, filename)
        if process_expression_sheet(input_path):
            processed_count += 1

    print(f"\nDone! {processed_count} expression sheet(s) processed.")


if __name__ == "__main__":
    main()