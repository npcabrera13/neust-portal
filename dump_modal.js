const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://neust-portal.link/', { waitUntil: 'networkidle2' });

        // Click the first "Access Portal" button
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const target = btns.find(b => b.textContent.includes('Access Portal'));
            if (target) target.click();
        });

        // Wait for the dialog to appear
        await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

        // Let animations play
        await new Promise(r => setTimeout(r, 1000));

        // Get the HTML of the overlay and dialog
        const modalDom = await page.evaluate(() => {
            const bodyChildren = document.body.children;
            let res = '';
            for (let el of bodyChildren) {
                if (el.tagName === 'DIV' && el.querySelector('[role="dialog"]')) {
                    res += el.outerHTML;
                }
                // also get standalone overlays if any
                if (el.className.includes('backdrop') || el.className.includes('fixed inset-0')) {
                    res += '\n' + el.outerHTML;
                }
            }
            return res;
        });

        fs.writeFileSync('C:/Users/liuxs/.gemini/antigravity/scratch/website_copy/modal_dump.html', modalDom);
        console.log('Successfully dumped modal HTML');
        await browser.close();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
