from pathlib import Path
import json, shutil
root = Path(__file__).resolve().parent.parent
out = root / '.cloudflare'
restaurant, ordering = out / 'restaurant', out / 'ordering'
# Generated output is confined to this repository's .cloudflare directory.
for target in (restaurant, ordering):
    assert target.resolve().parent == out.resolve()
    if target.exists(): shutil.rmtree(target)
    target.mkdir(parents=True)
for source in (root / 'dist').iterdir():
    if source.name == 'ordering': continue
    if source.is_dir(): shutil.copytree(source, restaurant / source.name)
    else: shutil.copy2(source, restaurant / source.name)
shutil.copytree(root / 'dist/ordering', ordering / 'ordering')
shutil.copy2(root / 'dist/ordering/index.html', ordering / 'index.html')
(ordering / '_redirects').write_text('/staff /index.html 200\n/staff/ /index.html 200\n', encoding='utf-8')
headers = json.loads((root / 'vercel.json').read_text(encoding='utf-8-sig'))['routes'][0]['headers']
(ordering / '_headers').write_text('/*\n' + ''.join('  '+k+': '+v+'\n' for k,v in headers.items()) + '/ordering/config.json\n  Cache-Control: no-store\n', encoding='utf-8')
print('Cloudflare output prepared in', out)
