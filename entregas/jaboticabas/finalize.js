const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const A = path.join(__dirname, 'assets');
const O = path.join(__dirname, 'assets-opt');

(async () => {
  // 1) Move optimized files into assets/, overwriting originals
  for (const f of fs.readdirSync(O)) {
    fs.copyFileSync(path.join(O, f), path.join(A, f));
  }
  console.log('Copied', fs.readdirSync(O).length, 'optimized files to /assets');

  // 2) Favicon multi-size from the existing favicon.png (cartoon jaboticaba)
  const faviconSrc = path.join(A, 'favicon.png');
  const favTasks = [
    ['favicon-32.png', 32],
    ['favicon-192.png', 192],
    ['favicon-512.png', 512],
    ['apple-touch-icon.png', 180],
  ];
  for (const [name, size] of favTasks) {
    await sharp(faviconSrc).resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9, palette: true }).toFile(path.join(A, name));
  }
  // Overwrite favicon.png with 192 version (lightweight for browsers that use single icon link)
  fs.copyFileSync(path.join(A, 'favicon-192.png'), path.join(A, 'favicon.png'));

  // 3) OG image (1200x630) — use piece-wa as bg + dark overlay + logo centered. Since we can't render text easily without pango/svg, we'll composite logo over piece-wa crop.
  const ogBg = await sharp(path.join(A, 'piece-wa.webp')).resize({ width: 1200, height: 630, fit: 'cover', position: 'bottom' }).toBuffer();
  const overlaySvg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2A0E1C" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#2A0E1C" stop-opacity="0.70"/>
          <stop offset="100%" stop-color="#2A0E1C" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <text x="600" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="96" font-weight="700" fill="#FAF3E7" font-style="italic">Da brasa</text>
      <text x="600" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="96" font-weight="700" fill="#E85D2E" font-style="italic">pra sua mesa.</text>
      <text x="600" y="480" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#D4A44B" letter-spacing="4">JABOTICABAS RESTAURANTE · HIDROLÂNDIA/GO</text>
    </svg>
  `);
  await sharp(ogBg).composite([{ input: overlaySvg }]).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(A, 'og-image.jpg'));

  console.log('Favicon sizes + OG image generated');

  // 4) Clean up
  const removed = [];
  for (const f of fs.readdirSync(O)) removed.push(f);
  fs.rmSync(O, { recursive: true, force: true });
  console.log('Removed temp assets-opt/');

  // 5) Final inventory
  console.log('\n=== Final /assets (size, name) ===');
  const files = fs.readdirSync(A).map(f => {
    const s = fs.statSync(path.join(A, f)).size;
    return [s, f];
  }).sort((a, b) => a[0] - b[0]);
  files.forEach(([s, f]) => console.log(` ${(s/1024).toFixed(0).padStart(5)}KB  ${f}`));
  const total = files.reduce((t, [s]) => t + s, 0);
  console.log(` TOTAL: ${(total/1024/1024).toFixed(2)} MB`);
})();
