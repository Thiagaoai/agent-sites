const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, 'index.html');
let html = fs.readFileSync(HTML_PATH, 'utf8');

// ─── 1. Replace Tailwind CDN + inline config with compiled CSS link ───
html = html.replace(
  /<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>\s*<script defer src="https:\/\/cdn\.jsdelivr\.net\/npm\/@alpinejs\/collapse[^"]+"><\/script>\s*<script defer src="https:\/\/cdn\.jsdelivr\.net\/npm\/alpinejs@3[^"]+"><\/script>\s*<script>\s*tailwind\.config = \{[\s\S]*?\}\s*<\/script>\s*<style>[\s\S]*?<\/style>/,
  `<link rel="stylesheet" href="/assets/tailwind.css">
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>`
);

// ─── 2. Wrap all <img src="/assets/NAME.jpg"...> with <picture> + WebP ───
// Handle multiline <img> tags. Match <img ... src="/assets/X.jpg" ... > (self-closing or not)
html = html.replace(
  /<img\s+([^>]*?)src="\/assets\/([^"]+)\.jpg"([^>]*)>/gs,
  (match, before, name, after) => {
    const webp = `/assets/${name}.webp`;
    // Strip any onerror handlers (not needed with <picture> fallback)
    const cleanBefore = before.replace(/\s*onerror="[^"]*"\s*/g, ' ').trim();
    const cleanAfter  = after.replace(/\s*onerror="[^"]*"\s*/g, ' ').trim();
    const mid = cleanBefore ? cleanBefore + ' ' : '';
    const end = cleanAfter ? ' ' + cleanAfter : '';
    return `<picture><source srcset="${webp}" type="image/webp"><img ${mid}src="/assets/${name}.jpg"${end}></picture>`;
  }
);

// ─── 3. Favicon block: multi-size PNG ───
html = html.replace(
  /<link rel="icon" type="image\/png" href="\/assets\/favicon\.png">\s*<link rel="apple-touch-icon" href="\/assets\/favicon\.png">\s*<link rel="shortcut icon" href="\/assets\/favicon\.png">/,
  `<link rel="icon" type="image/png" sizes="32x32"  href="/assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="shortcut icon" href="/assets/favicon.png">
<link rel="manifest" href="/site.webmanifest">`
);

// ─── 4. Replace OG image URL to the generated local one ───
html = html.replace(
  /content="https:\/\/jaboticabasrestaurante\.com\/assets\/og-image\.jpg"/g,
  `content="https://jaboticabasrestaurante.com/assets/og-image.jpg"`  // keep prod URL; deploy target will match
);

// ─── 5. Soften placeholders (preços, endereços) ───
html = html.replace(/a partir de R\$ --/g, 'consultar no WhatsApp');
html = html.replace(/Rua \[A DEFINIR\], n&ordm;? ?\[--\],?/g, '');
html = html.replace(/Rua \[A DEFINIR\], nº \[--\],?/g, '');
html = html.replace(/Rua \[A DEFINIR\], nº \[--\]/g, '');
html = html.replace(/Rua \[A DEFINIR\], n&ordm; \[--\]/g, '');
html = html.replace(/,\s*Centro · Hidrolândia\/GO/g, 'Centro · Hidrolândia/GO');
html = html.replace(/"streetAddress": "Rua \[A DEFINIR\], nº \[--\], Centro"/g, '"streetAddress": "Centro"');
html = html.replace(/"postalCode": "\[CEP\]"/g, '"postalCode": ""');
html = html.replace(/"streetAddress": "BR-153, Km \[--\]"/g, '"streetAddress": "BR-153"');
html = html.replace(/BR-153, Km \[--\]/g, 'BR-153 · Km a confirmar');

// ─── 6. Add FAQ Schema JSON-LD right after the LocalBusiness one ───
const faqSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Vocês aceitam cartão e PIX?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim! Aceitamos dinheiro, PIX, cartões de débito e crédito em todas as unidades." } },
    { "@type": "Question", "name": "Tem estacionamento?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim — ambas unidades possuem estacionamento próprio sem custo adicional." } },
    { "@type": "Question", "name": "Fazem delivery para quais bairros?",
      "acceptedAnswer": { "@type": "Answer", "text": "Atendemos Hidrolândia e cidades da região. Chama no WhatsApp e a gente confirma se entrega no seu endereço e o tempo estimado." } },
    { "@type": "Question", "name": "Como faço reserva para grupos?",
      "acceptedAnswer": { "@type": "Answer", "text": "Reservas para 4+ pessoas: WhatsApp (62) 98117-4063 com 24h de antecedência. Informe data, horário, nº de pessoas e unidade preferida." } },
    { "@type": "Question", "name": "Tem opção sem pequi?",
      "acceptedAnswer": { "@type": "Answer", "text": "Tem sim. Temos arroz branco e outros acompanhamentos — é só avisar na hora do pedido." } },
    { "@type": "Question", "name": "Qual é o prato mais pedido?",
      "acceptedAnswer": { "@type": "Answer", "text": "A Costela no Bafo é a estrela — 8h no fogão a lenha, desmancha no garfo. Também tem fila pelo Frango Assado na Brasa e a Galinhada." } }
  ]
}
</script>`;

html = html.replace(
  /(<\/script>\s*)(<!--\s*TRACKING HOOKS)/,
  `$1${faqSchema}\n$2`
);

fs.writeFileSync(HTML_PATH, html);
console.log('Patched index.html — size:', fs.statSync(HTML_PATH).size, 'bytes');
