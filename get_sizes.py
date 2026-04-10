from PIL import Image
import os

CHARACTERS_DIR = "CHARACTERS"
files = [f for f in os.listdir(CHARACTERS_DIR) if f.lower().endswith(".png")]
for filename in files:
    img = Image.open(os.path.join(CHARACTERS_DIR, filename))
    print(f"{filename}: {img.size} ({img.size[0] * img.size[1]} pixels)")
