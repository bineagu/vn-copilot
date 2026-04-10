import os
import re

# To avoid duplicates but keep things organized
sprite_data = {}

def process_file(file_path):
    # Regex to catch [Sprite Enter: Name - Description] or [Sprite Change: Name - Description]
    # More flexible to catch the exact text inside the brackets
    pattern = r"\[Sprite\s+(?:Enter|Change|Leave)?\s*:\s*([^\]]+)\]"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        matches = re.findall(pattern, content)
        for match in matches:
            if "Leave" in match: continue
            
            # Split by character name
            if " - " in match:
                char_name, description = match.split(" - ", 1)
            else:
                char_name, description = match, "Neutral"
            
            char_name = char_name.strip()
            description = description.strip()
            
            if char_name not in sprite_data:
                sprite_data[char_name] = set()
            
            sprite_data[char_name].add(description)

# List of files to process
files = [
    "SCRIPT/Script - Day 1.5_ The SD Card.md",
    "SCRIPT/Script - Day 10_ Chloe_s Last Stand.md",
    "SCRIPT/Script - Day 11_ The _Leo_ Echoes.md",
    "SCRIPT/Script - Day 12_ The Student Council _Honeypot_.md",
    "SCRIPT/Script - Day 1_ The Stalker_s Shadow.md",
    "SCRIPT/Script - Day 2_ The Unsolicited Gift.md",
    "SCRIPT/Script - Day 3_ The Library Standoff.md",
    "SCRIPT/Script - Day 4_ The House Invitation.md",
    "SCRIPT/Script - Day 5_ The Accident.md",
    "SCRIPT/Script - Day 6_ The _Perfect_ Reset.md",
    "SCRIPT/Script - Day 7_ The Beach Episode.md",
    "SCRIPT/Script - Day 8_ The _Maya_ Deletion Sequence.md",
    "SCRIPT/Script - Day 9_ The Ghost in the Machine.md",
    "SCRIPT/Script - Final Endings.md",
    "Full Script & Narrative Routes_ System.Override(Love).md"
]

for f in files:
    if os.path.exists(f):
        process_file(f)

# Helper for AI prompts
def make_prompt(char, desc):
    base = "(Anime style, high quality, 2D sprite, white background), "
    if "Iris" in char:
        if "Real World" in char or "disheveled" in desc.lower() or "hoodie" in desc.lower() or "knife" in desc.lower():
            return f"{base}Iris (Real World), disheveled, dark messy hair, sunken eyes, dark circles, pale skin, {desc}"
        else:
            return f"{base}Iris (VR), long dark hair, violet eyes, Japanese school uniform, {desc}"
    elif "Chloe" in char:
        return f"{base}Chloe, short brown hair, hazel eyes, school uniform, beige cardigan, {desc}"
    elif "Maya" in char:
        return f"{base}Maya, orange high ponytail, blue eyes, athletic track uniform, {desc}"
    elif "Leo" in char:
        return f"{base}Leo, messy blonde hair, school uniform, {desc}"
    else:
        return f"{base}{char}, {desc}"

with open("SPRITE_LIST_FOR_AI.md", 'w', encoding='utf-8') as out:
    out.write("# Full Sprite & Expression List for AI Generation\n\n")
    for char, descs in sorted(sprite_data.items()):
        out.write(f"## {char}\n")
        for d in sorted(descs):
            prompt = make_prompt(char, d)
            out.write(f"### Expression: {d}\n")
            out.write(f"**AI Prompt:** `{prompt}`\n\n")

print("Done! List saved to SPRITE_LIST_FOR_AI.md")
