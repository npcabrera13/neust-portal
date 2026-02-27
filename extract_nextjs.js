const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\portal_source.html', 'utf8');

const matches = [...html.matchAll(/self\.__next_f\.push\(\[1,"(.*?)"\]\)/g)];

let fullPayload = "";
for (const match of matches) {
    try {
        const str = match[1];
        const contentMatch = str.match(/^[0-9a-zA-Z]+:(.*)/);
        
        if (contentMatch) {
             let unescaped = contentMatch[1]
                 .replace(/\\"/g, '"')
                 .replace(/\\n/g, '\n')
                 .replace(/\\\\/g, '\\');
                 
             if (unescaped.startsWith('"') && unescaped.endsWith('"')) {
                 unescaped = unescaped.substring(1, unescaped.length - 1);
             }
             fullPayload += unescaped + "\n";
        }
    } catch (e) {
        console.error(e);
    }
}

fs.writeFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\portal_payload.txt', fullPayload);
console.log("Extracted payload to portal_payload.txt");
