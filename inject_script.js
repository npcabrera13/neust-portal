const fs = require('fs');
let html = fs.readFileSync('C:/Users/liuxs/.gemini/antigravity/scratch/website_copy/index.html', 'utf8');

// Strip out any previously injected broken scripts at the end
html = html.replace(/<script id="injected-interactions">[\s\S]*?<\/script>/, '');
html = html.replace(/<script>\s*\/\/\s*Vanilla JS Canvas Animation[\s\S]*?<\/script>/, '');
html = html.replace(/<script>\s*\/\/\s*Button click logic[\s\S]*?<\/script>/, '');

const customScript = `
<script id="injected-interactions">
// Vanilla JS Canvas Animation logic for the background
const canvas = document.querySelector('canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
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

// Theme toggle logic
const themeBtn = document.querySelector('button[data-slot="dropdown-menu-trigger"]');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

// Accordion Logic
document.querySelectorAll('[data-slot="accordion-item"]').forEach(item => {
    const btn = item.querySelector('button[data-slot="accordion-trigger"]');
    const contentId = btn?.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    
    if (btn && content) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isCurrentlyOpen = btn.getAttribute('aria-expanded') === 'true';
            const newState = isCurrentlyOpen ? 'closed' : 'open';
            
            // Toggle Button State
            btn.setAttribute('aria-expanded', !isCurrentlyOpen);
            btn.setAttribute('data-state', newState);

            // Toggle Item State
            item.setAttribute('data-state', newState);

            // Toggle Content State
            content.setAttribute('data-state', newState);
            if (!isCurrentlyOpen) {
                content.removeAttribute('hidden');
                
                // Determine campus name to dynamically insert programs if empty
                if (!content.hasAttribute('data-populated')) {
                    const campusName = btn.textContent.trim();
                    content.innerHTML = \`<div class="px-4 pb-4 pt-2 text-muted-foreground flex flex-col gap-2">
                            <p>Select a program below to proceed:</p>
                            <div class="flex flex-col gap-2 pl-4 border-l-2">
                                <a href="login.html" class="hover:underline text-primary">BS Information Technology</a>
                                <a href="login.html" class="hover:underline text-primary">BS Computer Science</a>
                                <a href="login.html" class="hover:underline text-primary">BS Engineering</a>
                                <a href="login.html" class="hover:underline text-primary">BA Education</a>
                            </div>
                        </div>\`;
                    content.setAttribute('data-populated', 'true');
                }

                // Add Radix UI height animation properties
                const contentInner = content.firstElementChild;
                if(contentInner) {
                    content.style.setProperty('--radix-accordion-content-height', contentInner.offsetHeight + 'px');
                }
            } else {
                 setTimeout(() => content.setAttribute('hidden', ''), 200);
            }
        });
    }
});

// Portal Access Button Logic
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Access Portal') || btn.textContent.includes('Open Grades Viewer')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'login.html';
        });
    }
});

// General anchor tag intercepts
document.querySelectorAll('a').forEach(a => {
    if(a.href && (a.href.includes('58.69.126.78') || a.href.includes('Server'))) {
        a.addEventListener('click', (e) => {
             e.preventDefault();
             e.stopPropagation();
             window.location.href = 'login.html';
        });
    }
});

</script>
</body>
`;

html = html.replace('</body>', customScript);

fs.writeFileSync('C:/Users/liuxs/.gemini/antigravity/scratch/website_copy/index.html', html);
console.log('Successfully injected interactions script directly into index.html');
