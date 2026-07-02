// scripts/remove_custom_headers.js
// Walk through all .tsx files under the `app` directory and strip any custom <header>...</header>
// and <footer>...</footer> markup. The shared Header/Footer components are already
// injected by `app/layout.tsx`.

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..'); // script located in <project>/scripts
const APP_DIR = path.join(PROJECT_ROOT, 'app');

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...walk(filePath));
    } else if (filePath.endsWith('.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

function stripHeaderFooter(content) {
  const headerRegex = /<header[^>]*>[\s\S]*?<\/header>/gi;
  const footerRegex = /<footer[^>]*>[\s\S]*?<\/footer>/gi;
  return content.replace(headerRegex, '').replace(footerRegex, '');
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const cleaned = stripHeaderFooter(original);
  if (cleaned !== original) {
    fs.writeFileSync(filePath, cleaned, 'utf8');
    console.log(`✅ Cleaned ${path.relative(PROJECT_ROOT, filePath)}`);
  }
}

function main() {
  const files = walk(APP_DIR);
  console.log(`Scanning ${files.length} .tsx files...`);
  files.forEach(processFile);
  console.log('✅ All custom header/footer elements removed.');
}

main();
