import os
from PIL import Image

public_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
exts = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.avif'}

def collect_images(directory):
    for root, _, files in os.walk(directory):
        for f in files:
            if os.path.splitext(f)[1].lower() in exts:
                yield os.path.join(root, f)

for input_path in collect_images(public_dir):
    output_path = os.path.splitext(input_path)[0] + '.webp'
    if os.path.exists(output_path):
        print(f'Skip (already exists): {os.path.relpath(output_path, public_dir)}')
        continue
    img = Image.open(input_path).convert('RGB')
    img.save(output_path, 'WEBP', quality=85)
    before = os.path.getsize(input_path) // 1024
    after = os.path.getsize(output_path) // 1024
    print(f'Converted: {os.path.relpath(input_path, public_dir)} -> .webp  ({before}KB -> {after}KB)')
