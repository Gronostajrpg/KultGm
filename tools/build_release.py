"""Build immutable Foundry release assets using only Python's standard library."""
import argparse
import json
import os
from pathlib import Path
import re
import zipfile
import hashlib


def build(repository, tag=None, output=None):
    root = Path(__file__).resolve().parents[1]
    if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', repository or ''):
        raise ValueError('Provide the real GitHub owner/repository.')
    manifest = json.loads((root / 'module.json').read_text(encoding='utf-8-sig'))
    version = manifest['version']
    if not re.fullmatch(r'\d+\.\d+\.\d+', version):
        raise ValueError('Version must have the form 1.2.0.')
    expected_tag = 'v' + version
    if tag and tag != expected_tag:
        raise ValueError(f'Tag {tag} does not match module version {expected_tag}.')
    if manifest['id'] != 'kult-gm-companion':
        raise ValueError('Module ID must remain kult-gm-companion.')
    origin = f'https://github.com/{repository}'
    manifest.update(url=origin,
                    manifest=origin + '/releases/latest/download/module.json',
                    download=origin + f'/releases/download/{expected_tag}/module.zip')
    out = Path(output) if output else root / 'release'
    out.mkdir(parents=True, exist_ok=True)
    encoded = (json.dumps(manifest, ensure_ascii=False, indent=2) + '\n').encode('utf-8')
    (out / 'module.json').write_bytes(encoded)
    files = []
    for folder in ('scripts', 'styles', 'companion'):
        files += sorted((root / folder).rglob('*'))
    with zipfile.ZipFile(out / 'module.zip', 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr('kult-gm-companion/module.json', encoded)
        for path in files:
            if path.is_symlink():
                raise ValueError('Symlinks are not allowed in release assets.')
            if path.is_file():
                archive.write(path, 'kult-gm-companion/' + path.relative_to(root).as_posix())
        archive.write(root / 'INSTALACJA.md', 'kult-gm-companion/INSTALACJA.md')
    with zipfile.ZipFile(out / 'module.zip') as archive:
        packaged = json.loads(archive.read('kult-gm-companion/module.json'))
        if packaged != manifest:
            raise ValueError('Archive manifest differs from the release manifest.')
        required = ['companion/index.html', 'companion/custom.js', 'companion/foundry.js',
                    *manifest['esmodules'], *manifest['styles']]
        for name in required:
            if 'kult-gm-companion/' + name not in archive.namelist():
                raise ValueError(f'Missing required release asset: {name}')
    hashes = []
    for name in ('module.json', 'module.zip'):
        hashes.append(hashlib.sha256((out / name).read_bytes()).hexdigest() + '  ' + name)
    (out / 'SHA256SUMS.txt').write_text('\n'.join(hashes) + '\n', encoding='ascii')
    return {'version': version, 'tag': expected_tag, 'manifest': manifest['manifest'],
            'archive': str(out / 'module.zip')}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repository', default=os.environ.get('GITHUB_REPOSITORY'))
    parser.add_argument('--tag')
    parser.add_argument('--output')
    args = parser.parse_args()
    print(json.dumps(build(args.repository, args.tag, args.output)))
