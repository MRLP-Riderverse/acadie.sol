#!/usr/bin/env python3
from pathlib import Path
import json, re

SITE = Path(__file__).resolve().parents[1]
DIRECTORY = Path('/home/midnight/ExoCortex/websites/projects/acadie_sol_directory/inbox')
OUT = SITE / 'assets' / 'directory-data.json'

items = []
for path in sorted(DIRECTORY.glob('*.md')):
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    title_line = lines[0].strip() if lines else '# Draft: Untitled'
    title = re.sub(r'^#\s*Draft:\s*', '', title_line).strip()
    draft = title_line.startswith('# Draft:')
    area = ''
    category = ''
    public_source = []
    note_lines = []
    current = None
    for line in lines[1:]:
        if line.startswith('Category:'):
            category = line.split(':',1)[1].strip(); continue
        if line.startswith('Area:'):
            area = line.split(':',1)[1].strip(); continue
        if line.strip() == '## Notes':
            current = 'notes'; continue
        if line.strip() == '## Public source':
            current = 'source'; continue
        if line.strip() == '## Public data to carry forward':
            current = 'public_data'; continue
        if line.strip() == '## Admin notes':
            current = 'admin'; continue
        if current == 'notes' and line.strip():
            note_lines.append(line.strip())
        elif current == 'source' and line.strip().startswith('- '):
            public_source.append(line.strip()[2:].strip())
        elif current == 'public_data' and line.strip().startswith('- '):
            note_lines.append(line.strip())
    summary = re.sub(r'\s+', ' ', ' '.join(note_lines)).strip()
    items.append({
        'title': title,
        'slug': path.stem,
        'draft': draft,
        'badge': 'DRAFT' if draft else '',
        'category': category,
        'area': area,
        'summary': summary[:220],
        'sources': public_source,
        'path': f'inbox/{path.name}',
    })
items.sort(key=lambda x: (0 if x['draft'] else 1, x['title'].lower()))
OUT.write_text(json.dumps({'generated_from': str(DIRECTORY), 'entry_count': len(items), 'items': items}, indent=2, ensure_ascii=False) + '
', encoding='utf-8')
print(f'wrote {OUT} with {len(items)} items')
