import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');
const outDir = path.resolve('clickmax');
fs.mkdirSync(outDir, { recursive: true });

const cdnBase = 'https://cmourao11.github.io/jatoba-expedicoes/';

let html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const assetFiles = fs.readdirSync(assetsDir);

const cssFile = assetFiles.find((f) => f.endsWith('.css'));
const jsFile = assetFiles.find((f) => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  throw new Error('Build files not found in dist/assets. Run npm run build first.');
}

const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

// Point relative image paths to live HTTPS CDN so Clickmax single-file HTML loads all photos anywhere
jsContent = jsContent.replaceAll('./images/', `${cdnBase}images/`);
const safeJs = jsContent.replace(/<\/script>/gi, '<\\/script>');

// Remove external script/css tags from Vite HTML
html = html.replace(/<script[^>]*src="[^"]*assets\/[^"]*\.js"[^>]*><\/script>\s*/g, '');
html = html.replace(/<link[^>]*href="[^"]*assets\/[^"]*\.css"[^>]*>\s*/g, '');
html = html.replace('href="./favicon.svg"', () => `href="${cdnBase}favicon.svg"`);

// Use callback replacers to avoid $& / $` expansion in minified bundles
const headInjection = `    <!-- Clickmax SDK / Pixel: cole seu script do Clickmax logo abaixo se desejar rastreamento de funil -->\n    <style>${cssContent}</style>\n  </head>`;
html = html.replace('</head>', () => headInjection);
html = html.replace('</body>', () => `    <script type="module">${safeJs}</script>\n  </body>`);

const outPath = path.join(outDir, 'jatoba-expedicoes-clickmax.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(`Generated Clickmax single-file HTML: ${outPath} (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
