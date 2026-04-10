import os
import sys
import shutil
import numpy as np
from rembg import remove, new_session
from PIL import Image

CHARACTERS_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "CHARACTERS_processed")
GAME_CHARS_DIR = os.path.join(os.path.dirname(__file__), "game", "public", "characters")

# Initialize the anime-specific model
print("Initializing isnet-anime model...")
session = new_session("isnet-anime")

def despill_green(img):
    """
    Specifically targets and neutralizes green 'spill' or fringing 
    that occurs when removing a green background.
    """
    # Convert to numpy array for processing
    arr = np.array(img).astype(np.float32)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    
    # Identify pixels where green is significantly dominant
    # (Typical of green screen spill)
    mask = (g > r * 1.05) & (g > b * 1.05)
    
    # Cap the green channel to the average of red and blue
    # This turns the green fringe into a neutral gray/brown 
    # which blends much better with character hair.
    avg_rb = (r + b) / 2.0
    arr[mask, 1] = np.minimum(g[mask], avg_rb[mask])
    
    return Image.fromarray(arr.astype(np.uint8))

def process_character(input_path, output_path):
    filename = os.path.basename(input_path)
    print(f"  Processing {filename}...")
    try:
        input_image = Image.open(input_path).convert("RGBA")
        
        # Use isnet-anime with light alpha matting to clean up hair edges.
        # We use a small erode_size (3) to avoid eating the character too much.
        output_image = remove(
            input_image, 
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=3 
        )
        
        # Specifically for 'Iris real', apply a green despill pass 
        # to fix the fringe from the new green background.
        if "Iris real" in filename:
            print("    (Applying green de-spill pass...)")
            output_image = despill_green(output_image)
        
        output_image.save(output_path)
        return True
    except Exception as e:
        print(f"    Error processing {input_path}: {e}")
        return False

def main():
    if not os.path.isdir(CHARACTERS_DIR):
        print(f"Error: {CHARACTERS_DIR} not found")
        sys.exit(1)

    files = [f for f in os.listdir(CHARACTERS_DIR) if f.lower().endswith(".png")]
    if not files:
        print("No PNG files found in CHARACTERS/")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    for filename in files:
        input_path = os.path.join(CHARACTERS_DIR, filename)
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        if process_character(input_path, output_path):
            print(f"    ✓ Saved to {OUTPUT_DIR}")
            if os.path.isdir(GAME_CHARS_DIR):
                shutil.copy2(output_path, os.path.join(GAME_CHARS_DIR, filename))

    print(f"\nDone! {len(files)} images processed.")

if __name__ == "__main__":
    main()
