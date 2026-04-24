const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEXT_EXTS = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg', '.webmanifest', '.md']);
const SKIP_DIRS = new Set(['node_modules', 'reports', 'screenshots', '.git']);
const SKIP_FILES = new Set([
  'prepare-deploy.cjs', 'finalize.js', 'optimize.js', 'patch-html.js',
  'package.json', 'package-lock.json', 'pnpm-lock.yaml',
  'tailwind.config.js', 'src.css', 'wireframe.md', 'README.md',
  'netlify.toml', '.vercelignore'
]);

const files = [];

function walk(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), path.posix.join(rel, entry.name));
    } else {
      if (SKIP_FILES.has(entry.name)) continue;
      if (entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      const relPath = path.posix.join(rel, entry.name);
      const ext = path.extname(entry.name).toLowerCase();
      const isText = TEXT_EXTS.has(ext);
      const data = isText
        ? fs.readFileSync(full, 'utf8')
        : fs.readFileSync(full).toString('base64');
      files.push({ file: relPath, data, encoding: isText ? 'text' : 'base64' });
    }
  }
}

walk(ROOT);

const payload = {
  name: 'jaboticabas',
  target: 'staging',
  files: files.map(f => ({ file: f.file, data: f.data })),
  projectSettings: { framework: null, buildCommand: null, outputDirectory: null },
  skipAutoDetectionConfirmation: '1'
};

fs.writeFileSync(path.join(ROOT, 'deploy-payload.json'), JSON.stringify(payload));

const summary = files.map(f => `${f.encoding === 'text' ? 'T' : 'B'} ${f.file} (${(f.encoding === 'text' ? Buffer.byteLength(f.data, 'utf8') : f.data.length * 0.75 | 0)}b)`).join('\n');
const totalBytes = JSON.stringify(payload).length;
console.log(summary);
console.log(`---\nTotal files: ${files.length}`);
console.log(`Payload JSON size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
