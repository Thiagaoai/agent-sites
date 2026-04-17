const { chromium } = require('playwright');
const path = require('path');

const [url, filename, width] = process.argv.slice(2);

if (!url || !filename || !width) {
  console.error('Uso: node screenshot.js <url> <arquivo.png> <largura>');
  console.error('Exemplo: node screenshot.js https://google.com teste.png 375');
  process.exit(1);
}

const widthPx = parseInt(width, 10);
if (isNaN(widthPx) || widthPx <= 0) {
  console.error('Largura deve ser um número positivo.');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: widthPx, height: 800 },
  });

  await page.goto(url, { waitUntil: 'networkidle' });

  const outputPath = path.join(__dirname, 'entregas', filename);
  await page.screenshot({ path: outputPath, fullPage: true });

  await browser.close();
  console.log(`Screenshot salvo em: ${outputPath}`);
})();
