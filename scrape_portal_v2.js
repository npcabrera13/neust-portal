const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();

        console.log('Navigating to https://neust-portal.link/ ...');
        await page.goto('https://neust-portal.link/', { waitUntil: 'domcontentloaded', timeout: 60000 });

        console.log('Waiting for client-side rendering to finish...');
        await new Promise(r => setTimeout(r, 6000));

        const html = await page.evaluate(() => {
            // Fix relative links to be absolute for stylesheets, scripts, images
            document.querySelectorAll('link[rel="stylesheet"]').forEach(el => {
                const href = el.getAttribute('href');
                if (href && href.startsWith('/')) {
                    if (href.includes('97880c463ee4be90.css')) {
                        el.href = '_next/static/chunks/97880c463ee4be90.css';
                    } else {
                        el.href = 'https://neust-portal.link' + href;
                    }
                }
            });
            document.querySelectorAll('img[src]').forEach(el => {
                const src = el.getAttribute('src');
                if (src && src.startsWith('/')) el.src = 'logo.png';
                const srcset = el.getAttribute('srcset');
                if (srcset) {
                    el.removeAttribute('srcset'); // just use standard src for logo
                }
            });

            // Remove Next JS scripts to prevent hydration issues
            document.querySelectorAll('script').forEach(el => {
                if (el.src && el.src.includes('/_next/')) el.remove();
                if (el.innerHTML && el.innerHTML.includes('__NEXT_DATA__')) el.remove();
            });

            // Intercept links to point to login.html
            document.querySelectorAll('a').forEach(el => {
                if (el.href && (el.href.includes('58.69.126.78') || el.href.includes('Server'))) {
                    el.href = 'login.html';
                }
            });

            return document.documentElement.outerHTML;
        });

        const finalDoc = '<!DOCTYPE html>\n<html lang="en">\n' + html.substring(html.indexOf('<head>')) +
            `
      <script>
      // Vanilla JS Canvas Animation logic for the background
      const canvas = document.querySelector('canvas');
      if (canvas) {
          const ctx = canvas.getContext('2d');
          let width = canvas.width = window.innerWidth;
          let height = canvas.height = window.innerHeight;

          window.addEventListener('resize', () => {
              width = canvas.width = window.innerWidth;
              height = canvas.height = window.innerHeight;
          });

          const stars = [];
          for (let i = 0; i < 150; i++) {
              stars.push({
                  x: Math.random() * width,
                  y: Math.random() * height,
                  radius: Math.random() * 1.5,
                  vx: Math.random() * 0.5 - 0.25,
                  vy: Math.random() * 0.5 - 0.25
              });
          }

          function draw() {
              ctx.clearRect(0, 0, width, height);
              ctx.fillStyle = '#dc7702';
              ctx.beginPath();
              
              stars.forEach(star => {
                  ctx.moveTo(star.x, star.y);
                  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

                  star.x += star.vx;
                  star.y += star.vy;

                  if (star.x < 0 || star.x > width) star.vx = -star.vx;
                  if (star.y < 0 || star.y > height) star.vy = -star.vy;
              });
              ctx.fill();
              requestAnimationFrame(draw);
          }
          draw();
      }

      // Theme toggle logic (extracted from Next.js injected script)
      const btn = document.querySelector('button[data-slot="dropdown-menu-trigger"]');
      if (btn) {
          btn.addEventListener('click', () => {
              document.documentElement.classList.toggle('dark');
          });
      }
      </script>
      `;

        fs.writeFileSync('C:\\Users\\liuxs\\.gemini\\antigravity\\scratch\\website_copy\\index.html', finalDoc);
        console.log('Extracted rendered HTML successfully to index.html!');

        await browser.close();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
