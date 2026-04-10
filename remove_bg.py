"""
Remove white backgrounds from character PNG images.
Uses flood-fill from edges to find connected background regions,
with conservative post-processing to avoid damaging the character.
"""

from PIL import Image, ImageFilter
import numpy as np
import os
import sys
import shutil
from collections import deque

CHARACTERS_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS_processed")
GAME_CHARS_DIR = os.path.join(os.path.dirname(__file__), "game", "public", "characters")

# Pixels brighter than this on ALL channels are considered "white"
# Lowered to 240 to catch "near-white" fringe pixels better
WHITE_THRESHOLD = 240

# 8-connectivity neighbors (includes diagonals) to reach interior gaps
NEIGHBORS_8 = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

# Re-enabled interior gap removal. Blobs smaller than 2% of image are considered gaps.
# This should catch thigh gaps and arm holes without eating white shirts.
INTERIOR_BLOB_MAX_PCT = 2.0


def flood_fill_bg_mask(img_array: np.ndarray) -> np.ndarray:
    """Flood-fill from image edges using 8-connectivity to find connected white background pixels."""
    h, w = img_array.shape[:2]
    r, g, b = img_array[:, :, 0], img_array[:, :, 1], img_array[:, :, 2]

    # Check if all channels are above threshold
    is_white = (r >= WHITE_THRESHOLD) & (g >= WHITE_THRESHOLD) & (b >= WHITE_THRESHOLD)

    visited = np.zeros((h, w), dtype=bool)
    mask = np.zeros((h, w), dtype=bool)

    queue = deque()

    # Seed from all edge pixels that are white
    for x in range(w):
        for y in [0, h - 1]:
            if is_white[y, x] and not visited[y, x]:
                queue.append((y, x))
                visited[y, x] = True
    for y in range(1, h - 1):
        for x in [0, w - 1]:
            if is_white[y, x] and not visited[y, x]:
                queue.append((y, x))
                visited[y, x] = True

    while queue:
        cy, cx = queue.popleft()
        mask[cy, cx] = True
        for dy, dx in NEIGHBORS_8:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_white[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))

    return mask


def find_interior_white_blobs(img_array: np.ndarray, bg_mask: np.ndarray) -> np.ndarray:
    """Find interior white blobs not connected to the edge background.
    These are gaps (between thighs, elbow-body, hair gaps, etc.)"""
    from scipy.ndimage import label

    h, w = img_array.shape[:2]
    r, g, b = img_array[:, :, 0], img_array[:, :, 1], img_array[:, :, 2]

    # White pixels that weren't caught by edge flood fill
    is_white = (r >= WHITE_THRESHOLD) & (g >= WHITE_THRESHOLD) & (b >= WHITE_THRESHOLD)
    interior_white = is_white & ~bg_mask

    if not np.any(interior_white):
        return np.zeros((h, w), dtype=bool)

    # Label connected components of interior white pixels (8-connectivity)
    struct = np.ones((3, 3), dtype=int)
    labeled, num_features = label(interior_white, structure=struct)

    total_pixels = h * w
    max_blob_size = total_pixels * INTERIOR_BLOB_MAX_PCT / 100.0

    remove_mask = np.zeros((h, w), dtype=bool)
    for i in range(1, num_features + 1):
        blob = labeled == i
        blob_size = blob.sum()
        # Only remove if it's smaller than the threshold (to protect white clothes)
        if blob_size < max_blob_size:
            remove_mask |= blob

    return remove_mask


def remove_bg(input_path: str, output_path: str):
    """Remove background and apply edge cleanup to eliminate white fringe."""
    from scipy.ndimage import binary_dilation

    img = Image.open(input_path).convert("RGBA")
    arr = np.array(img)

    # Step 1: Flood fill from edges to find main background
    bg_mask = flood_fill_bg_mask(arr)

    # Step 2: Find interior white blobs (gaps)
    interior_mask = find_interior_white_blobs(arr, bg_mask)
    
    # Step 3: Expand masks to eat the white fringe border
    # Exterior needs more dilation to fix "jagged white edges"
    expanded_bg = binary_dilation(bg_mask, iterations=4)
    # Interior gaps also need a bit of dilation to clean their edges
    expanded_interior = binary_dilation(interior_mask, iterations=2)

    # Combine both
    full_mask = expanded_bg | expanded_interior

    # Set all background pixels to fully transparent
    arr[full_mask, 3] = 0

    result = Image.fromarray(arr, "RGBA")

    # Step 4: Smoothing
    # Increased Gaussian blur radius for smoother edges
    alpha = result.split()[3]
    alpha_blurred = alpha.filter(ImageFilter.GaussianBlur(radius=1.0))

    alpha_np = np.array(alpha).astype(np.float32)
    blurred_np = np.array(alpha_blurred).astype(np.float32)

    # Apply blur only at edges (where alpha transitions)
    is_edge = np.abs(alpha_np - blurred_np) > 1
    final_alpha = alpha_np.copy()
    final_alpha[is_edge] = blurred_np[is_edge]

    result.putalpha(Image.fromarray(final_alpha.astype(np.uint8)))
    result.save(output_path, "PNG")
    print(f"  ✓ {os.path.basename(output_path)}")




def main():
    if not os.path.isdir(CHARACTERS_DIR):
        print(f"Error: {CHARACTERS_DIR} not found")
        sys.exit(1)

    files = [f for f in os.listdir(CHARACTERS_DIR) if f.lower().endswith(".png")]
    if not files:
        print("No PNG files found in CHARACTERS/")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Processing {len(files)} character images...")

    for filename in files:
        input_path = os.path.join(CHARACTERS_DIR, filename)
        output_path = os.path.join(OUTPUT_DIR, filename)
        remove_bg(input_path, output_path)

        # Also copy to game/public/characters
        if os.path.isdir(GAME_CHARS_DIR):
            game_path = os.path.join(GAME_CHARS_DIR, filename)
            shutil.copy2(output_path, game_path)

    print(f"\nDone! {len(files)} images processed.")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
