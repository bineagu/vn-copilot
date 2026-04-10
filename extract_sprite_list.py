import os
import re
from collections import defaultdict

def extract_sprites(md_path):
    # Regex to catch [Sprite Enter: Name - Expression] or [Sprite Change: Name - Expression]
    # Also handles cases like [Sprite: Name - Expression]
    pattern = r"\[Sprite (?:Enter|Change|Leave)?\s*:\s*([^\]]+)\]"
    
    sprites_found = []
    try:
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
            matches = re.findall(pattern, content)
            for match in matches:
                # Expecting "Character - Expression" or just "Character"
                parts = match.split('-')
                char_name = parts[0].strip()
                expression = parts[1].strip() if len(parts) > 1 else "Neutral"
                sprites_found.append((char_name, expression))
    except Exception as e:
        print(f"Error reading {md_path}: {e}")
    return sprites_found

def main():
    script_dir = "SCRIPT"
    all_sprites = defaultdict(set)
    
    files = [f for f in os.listdir(script_dir) if f.lower().endswith(".md")]
    for filename in files:
        found = extract_sprites(os.path.join(script_dir, filename))
        for name, expr in found:
            # Clean up the name if it includes multiple characters
            if "and" in name.lower():
                for sub_name in name.lower().split("and"):
                    all_sprites[sub_name.strip().capitalize()].add(expr)
            else:
                all_sprites[name].add(expr)

    print("# Character Sprite & Expression Requirements\n")
    for char, exprs in sorted(all_sprites.items()):
        if not char or char == "Leave": continue
        print(f"## {char}")
        for expr in sorted(exprs):
            print(f"- {expr}")
        print("")

if __name__ == "__main__":
    main()
