import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = path.resolve('dist');
const distSsrDir = path.resolve('dist-ssr');
const assetsDir = path.join(distDir, 'assets');
const outDir = path.resolve('clickmax');
fs.mkdirSync(outDir, { recursive: true });

const cdnBase = 'https://cmourao11.github.io/jatoba-expedicoes/';

// 1. Load compiled SSR renderer and pre-render full semantic HTML into dist/index.html
const ssrEntryPath = path.join(distSsrDir, 'entry-server.js');
let renderedAppHtml = '';
if (fs.existsSync(ssrEntryPath)) {
  const ssrModule = await import(pathToFileURL(ssrEntryPath).href);
  renderedAppHtml = ssrModule.renderAppHtml();
  fs.rmSync(distSsrDir, { recursive: true, force: true });
}

const distIndexPath = path.join(distDir, 'index.html');
let distHtml = fs.readFileSync(distIndexPath, 'utf8');

if (renderedAppHtml && distHtml.includes('<div id="root"></div>')) {
  distHtml = distHtml.replace('<div id="root"></div>', () => `<div id="root">${renderedAppHtml}</div>`);
  fs.writeFileSync(distIndexPath, distHtml, 'utf8');
  console.log('Injected full SSR pre-rendered HTML into dist/index.html');
}

// 2. Build self-contained Clickmax HTMLs
const assetFiles = fs.readdirSync(assetsDir);
const cssFile = assetFiles.find((f) => f.endsWith('.css'));
const jsFile = assetFiles.find((f) => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  throw new Error('Build files not found in dist/assets.');
}

const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

let baseClickmaxHtml = distHtml.replaceAll('./images/', `${cdnBase}images/`);
jsContent = jsContent.replaceAll('./images/', `${cdnBase}images/`);
const safeJs = jsContent.replace(/<\/script>/gi, '<\\/script>');

baseClickmaxHtml = baseClickmaxHtml.replace(/<script[^>]*src="[^"]*assets\/[^"]*\.js"[^>]*><\/script>\s*/g, '');
baseClickmaxHtml = baseClickmaxHtml.replace(/<link[^>]*href="[^"]*assets\/[^"]*\.css"[^>]*>\s*/g, '');
baseClickmaxHtml = baseClickmaxHtml.replace('href="./favicon.svg"', () => `href="${cdnBase}favicon.svg"`);

const vanillaController = `<script>
(function(){
  function initFallback(){
    if (window.__JATOBA_REACT_MOUNTED__) return;
    var form = document.querySelector('form[aria-label="Buscador de expedições"]');
    if (form) {
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var sec = document.getElementById('roteiros');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }
    document.querySelectorAll('button').forEach(function(btn){
      var txt = (btn.textContent || '').trim();
      if (/Simular|Consultar|Cotar|Montar|Roteiro Dia a Dia/i.test(txt)) {
        btn.addEventListener('click', function(){
          window.open('https://www.instagram.com/jatobaexpedicoes/', '_blank', 'noopener,noreferrer');
        });
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(initFallback, 400); });
  } else {
    setTimeout(initFallback, 400);
  }
})();
</script>`;

const headInjection = `    <!-- Clickmax Browser SDK / Pixel: cole seu script do Clickmax abaixo se necessário -->\n    <style>${cssContent}</style>\n  </head>`;
const styledHtml = baseClickmaxHtml.replace('</head>', () => headInjection);

// 2A. Full React + SSR single-file HTML
const fullClickmaxHtml = styledHtml.replace(
  '</body>',
  () => `    <script type="module">${safeJs}</script>\n    ${vanillaController}\n  </body>`
);

// 2B. Ultra-light Visual-Editor HTML (Pure Semantic HTML + CSS + Vanilla JS, ~150KB, zero React bundle)
const liteClickmaxHtml = styledHtml.replace('</body>', () => `    ${vanillaController}\n  </body>`);

const clickmaxOutPath = path.join(outDir, 'jatoba-expedicoes-clickmax.html');
const liteOutPath = path.join(outDir, 'jatoba-expedicoes-leve.html');
const distClickmaxPath = path.join(distDir, 'clickmax.html');

fs.writeFileSync(clickmaxOutPath, fullClickmaxHtml, 'utf8');
fs.writeFileSync(liteOutPath, liteClickmaxHtml, 'utf8');
fs.writeFileSync(distClickmaxPath, fullClickmaxHtml, 'utf8');

console.log(
  `Generated Clickmax Full (${Math.round(Buffer.byteLength(fullClickmaxHtml) / 1024)} KB) & Lite (${Math.round(
    Buffer.byteLength(liteClickmaxHtml) / 1024
  )} KB)`
);
