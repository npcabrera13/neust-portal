const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'new_source.html');
const destPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(srcPath, 'utf8');

// 1. Image path
html = html.replace('"images/neust_logo.png"', '"logo.png"');

// 2. Grades viewing link
html = html.replace('href="/gradesviewer/"', 'href="login.html"');

// 3. Obfuscated JS overrides
// We can just append a script at the end of the body to override the click behaviors.
// The obfuscated JS sets the href on change of programSelect or serverSelect.
// By adding an event listener, we can prevent the default navigation and redirect to our local login.html.
const overrideScript = ``;
html = html.replace('</body>', overrideScript + '\n</body>');

fs.writeFileSync(destPath, html);
console.log('Successfully wrote index.html');

// Create clients directory and files
const clientsDir = path.join(__dirname, 'clients');
if (!fs.existsSync(clientsDir)) {
    fs.mkdirSync(clientsDir);
    console.log('Created clients directory');
}

for (let i = 1; i <= 10; i++) {
    // Generate a user count between 12 and 25 for realism
    const count = Math.floor(Math.random() * 14) + 12;
    fs.writeFileSync(path.join(clientsDir, `server${i}.txt`), count.toString());
}
console.log('Successfully generated mock serverX.txt data files in clients/');

console.log('UI Overhaul completed.');
