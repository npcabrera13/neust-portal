const fs = require('fs');

const rawHtml = fs.readFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\portal_source.html', 'utf8');

// The Next.js server-rendered HTML starts at <body ...> and ends at <script ... id="__NEXT_DATA__"(if exists) or just before the scripts.
// Let's just find the `<body>` tag and extract up to `</body>`
const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (bodyMatch) {
    let bodyContent = bodyMatch[0];

    // Quick formatting to make it readable
    bodyContent = bodyContent.replace(/></g, '>\n<');

    fs.writeFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\portal_body_formatted.html', bodyContent);
    console.log("Extracted body!");
} else {
    console.log("Could not find body tag.");
}
