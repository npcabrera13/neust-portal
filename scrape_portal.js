const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ ignoreHTTPSErrors: true });
    const page = await browser.newPage();

    // Navigate to the portal
    await page.goto('https://neust-portal.link/', { waitUntil: 'networkidle0' });

    // Get the fully rendered HTML
    const html = await page.evaluate(() => document.documentElement.outerHTML);

    fs.writeFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\portal_rendered.html', html);
    console.log("Extracted rendered HTML!");

    await browser.close();
})();
