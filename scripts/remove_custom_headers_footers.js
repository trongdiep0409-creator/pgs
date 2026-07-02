// scripts/remove_custom_headers_footers.js
// This script scans the project's .tsx files (excluding the shared Header/Footer components)
// and removes any custom <header>...</header> and <footer>...</footer> JSX blocks.
// It aims to ensure all pages rely on the global Header/Footer defined in app/layout.tsx.

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..'); // project root
const excludeFiles = new Set([
  path.join(projectRoot, 'components', 'Header.tsx'),
  path.join(projectRoot, 'components', 'Footer.tsx')
]);

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip node_modules and .next
      if (['node_modules', '.next', 'out', 'dist', '.git'].includes(entry.name)) continue;
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      if (excludeFiles.has(fullPath)) continue;
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      // Remove custom <header>...</header>
      content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/g, '');
      // Remove custom <footer>...</footer>
      content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/g, '');
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned ${fullPath}`);
      }
    }
  }
}

walkDir(projectRoot);
console.log('Header/footer cleanup completed.');
