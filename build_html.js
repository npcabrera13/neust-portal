const fs = require('fs');

const rawHtml = fs.readFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\portal_source.html', 'utf8');

// 1. Extract Head
const headMatch = rawHtml.match(/<head>(.*?)<\/head>/is);
let head = headMatch ? headMatch[1] : '';

// Remove Next.js preload and hydration scripts to prevent errors/flickering
head = head.replace(/<link rel="preload"[^>]+as="script"[^>]*>/g, '');
head = head.replace(/<script src="\/_next\/static[^>]+><\/script>/g, '');

// Fix the CSS link to use local path instead of absolute /_next/...
head = head.replace(/href="\/_next\/static\/chunks\/97880c463ee4be90\.css"/, 'href="_next/static/chunks/97880c463ee4be90.css"');

// Fix image links to be relative just in case
head = head.replace(/"\/_next\/image/g, '"_next/image');
head = head.replace(/"\/favicon.ico/g, '"favicon.ico');
head = head.replace(/"\/logo.png"/g, '"logo.png"');

// 2. Extract Body Content
const bodyMatch = rawHtml.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
let bodyAttrs = bodyMatch ? bodyMatch[1] : '';
let bodyContent = bodyMatch ? bodyMatch[2] : '';

// Quick regex formatting
bodyContent = bodyContent.replace(/></g, '>\n<');

// Remove Next.js script tags at the end of the body
bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

// Relativize image paths in body
bodyContent = bodyContent.replace(/"\/_next\/image/g, '"_next/image');
bodyContent = bodyContent.replace(/"\/logo.png"/g, '"logo.png"');


// 3. Construct the exact 1:1 HTML
const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${head}
</head>
<body ${bodyAttrs}>
  ${bodyContent}
</body>
</html>`;

fs.writeFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\index.html', finalHtml);
console.log("Written exact 1:1 index.html!");
