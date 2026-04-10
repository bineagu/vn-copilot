import os
import sys
import docx

def convert_docx_to_md(docx_path):
    print(f"Converting {docx_path}...")
    try:
        doc = docx.Document(docx_path)
        md_content = []
        for para in doc.paragraphs:
            # Basic conversion: handle bold and italic
            text = para.text
            if not text.strip():
                md_content.append("")
                continue
            
            # Use paragraph style for headers if possible
            if para.style.name.startswith('Heading'):
                level = para.style.name.split(' ')[-1]
                if level.isdigit():
                    text = "#" * int(level) + " " + text
            
            md_content.append(text)
            
        md_path = docx_path.rsplit('.', 1)[0] + ".md"
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write("\n".join(md_content))
        print(f"  ✓ Saved to {md_path}")
        return True
    except Exception as e:
        print(f"  Error: {e}")
        return False

def main():
    # Convert files in SCRIPT/
    script_dir = "SCRIPT"
    if os.path.isdir(script_dir):
        files = [f for f in os.listdir(script_dir) if f.lower().endswith(".docx")]
        for f in files:
            convert_docx_to_md(os.path.join(script_dir, f))
            
    # Convert root docx files
    root_files = [f for f in os.listdir(".") if f.lower().endswith(".docx")]
    for f in root_files:
        convert_docx_to_md(f)

if __name__ == "__main__":
    main()
