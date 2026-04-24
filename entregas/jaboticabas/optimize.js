const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, 'assets');
const OPT   = path.join(__dirname, 'assets-opt');
if (!fs.existsSync(OPT)) fs.mkdirSync(OPT);

const PLAN = [
  ['prato-costela',      1200, 900,  'jpg'],
  ['prato-frango',       1200, 900,  'jpg'],
  ['prato-peixe',        1200, 900,  'jpg'],
  ['prato-galinhada',    1200, 900,  'jpg'],
  ['prato-tutu',         1200, 900,  'jpg'],
  ['prato-arroz-pequi',  1200, 900,  'jpg'],

  ['galeria-1',          900,  1200, 'jpg'],
  ['galeria-2',          900,  1350, 'jpg'],
  ['galeria-3',          900,  1200, 'jpg'],
  ['galeria-4',          900,  1200, 'jpg'],
  ['galeria-5',          900,  1200, 'jpg'],
  ['galeria-6',          900,  1200, 'jpg'],

  ['gemini-0',           900,  1200, 'jpg'],
  ['gemini-1',           900,  1200, 'jpg'],
  ['gemini-2',           900,  1200, 'jpg'],
  ['gemini-3',           900,  1200, 'jpg'],
  ['gemini-4',           900,  1200, 'jpg'],
  ['gemini-5',           900,  1350, 'jpg'],

  ['hero-costela',       900,  1200, 'jpg'],
  ['hero-bg',            1600, 1200, 'jpg'],
  ['piece-wa',           1600, 2400, 'jpg'],
];

(async () => {
  const results = [];
  let origTotal = 0, newTotal = 0;
  for (const [name, w, h, ext] of PLAN) {
    const src = path.join(ASSETS, `${name}.${ext}`);
    if (!fs.existsSync(src)) { console.log('SKIP missing',name); continue; }
    const origSize = fs.statSync(src).size; origTotal += origSize;

    // JPG resized (for fallback)
    const jpgOut = path.join(OPT, `${name}.jpg`);
    await sharp(src).resize({ width: w, height: h, fit: 'cover', position: 'attention' })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(jpgOut);

    // WebP (primary format)
    const webpOut = path.join(OPT, `${name}.webp`);
    await sharp(src).resize({ width: w, height: h, fit: 'cover', position: 'attention' })
      .webp({ quality: 78, effort: 5 }).toFile(webpOut);

    const nJpg = fs.statSync(jpgOut).size;
    const nWebp = fs.statSync(webpOut).size;
    newTotal += nWebp; // browser uses webp

    results.push({ name, orig: origSize, jpg: nJpg, webp: nWebp, saved: origSize - nWebp });
  }

  // Logo: keep PNG but make smaller + make WebP version for modern browsers
  const logoSrc = path.join(ASSETS, 'logo-light.png');
  if (fs.existsSync(logoSrc)) {
    const o = fs.statSync(logoSrc).size; origTotal += o;
    await sharp(logoSrc).resize({ width: 640 }).png({ quality: 90, compressionLevel: 9, palette: true })
      .toFile(path.join(OPT, 'logo-light.png'));
    await sharp(logoSrc).resize({ width: 640 }).webp({ quality: 88 })
      .toFile(path.join(OPT, 'logo-light.webp'));
    const n = fs.statSync(path.join(OPT,'logo-light.webp')).size;
    newTotal += n;
    results.push({ name: 'logo-light', orig: o, jpg: fs.statSync(path.join(OPT,'logo-light.png')).size, webp: n, saved: o - n });
  }

  console.log('=== Per-file ===');
  results.forEach(r => {
    const pct = ((r.saved/r.orig)*100).toFixed(1);
    console.log(` ${r.name.padEnd(22)} ${(r.orig/1024).toFixed(0).padStart(5)}KB → webp ${(r.webp/1024).toFixed(0).padStart(4)}KB (jpg ${(r.jpg/1024).toFixed(0).padStart(4)}KB) | -${pct}%`);
  });
  console.log('=== Totals ===');
  console.log(` Original:  ${(origTotal/1024/1024).toFixed(2)} MB`);
  console.log(` Optimized: ${(newTotal/1024/1024).toFixed(2)} MB (webp)`);
  console.log(` Saved:     ${((origTotal-newTotal)/1024/1024).toFixed(2)} MB (${(((origTotal-newTotal)/origTotal)*100).toFixed(1)}%)`);
})();
