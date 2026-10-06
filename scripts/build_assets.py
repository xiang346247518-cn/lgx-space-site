"""Optional image optimisation. The site falls back to original JPGs for new images.

Usage: pip install Pillow && python scripts/build_assets.py
"""
from pathlib import Path
import json
import math
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
catalog = root / 'data/projects.json'
data = json.loads(catalog.read_text())
output = root / 'assets/media'
output.mkdir(exist_ok=True)
variants = {}
for source in (root / 'assets/projects').glob('*.jpg'):
    image = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    destination = output / (source.stem + '.webp')
    image.save(destination, 'WEBP', quality=80, method=6)
    variants[str(source.relative_to(root))] = str(destination.relative_to(root))
projects = data['projects']
columns, tile_width, tile_height = 5, 480, 320
rows = max(1, math.ceil(len(projects) / columns))
atlas = Image.new('RGB', (columns * tile_width, rows * tile_height), (233, 231, 223))
for index, project in enumerate(projects):
    image = ImageOps.fit(Image.open(root / project['image']).convert('RGB'), (tile_width, tile_height), method=Image.Resampling.LANCZOS)
    atlas.paste(image, ((index % columns) * tile_width, (index // columns) * tile_height))
atlas.save(root / 'assets/archive-atlas.webp', 'WEBP', quality=75, method=6)
data['thumbnailAtlas'] = {'image': 'assets/archive-atlas.webp', 'columns': columns, 'rows': rows, 'projects': {p['id']: {'index': i, 'image': p['image']} for i, p in enumerate(projects)}}
data['optimizedImages'] = variants
catalog.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print('Updated optimised images, archive atlas and catalogue image manifest.')
