const fs = require('fs');
let html = fs.readFileSync('C:/Users/liuxs/.gemini/antigravity/scratch/website_copy/index.html', 'utf8');

// Strip out any previously injected broken scripts at the end
html = html.replace(/<script id=\"injected-interactions\">[\s\S]*?<\/script>/, '');
html = html.replace(/<div id=\"custom-portal-modal\">[\s\S]*?<\/div>\s*<script id=\"injected-interactions\">[\s\S]*?<\/script>/, '');

const modalHtml = `
<div id="custom-portal-modal" style="display: none; position: fixed; inset: 0; z-index: 50; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); align-items: center; justify-content: center;">
    <div style="background: #020817; border: 1px solid #1e293b; border-radius: 0.75rem; width: 90%; max-width: 500px; padding: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); position: relative; color: #f8fafc;">
        <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; opacity: 0.7; cursor: pointer; background: transparent; border: none; font-size: 1.25rem; color: #f8fafc;">
            &times;
        </button>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
                <h2 id="modal-server-title" style="font-size: 1.125rem; font-weight: 600; line-height: 1;">Server 1</h2>
                <p style="font-size: 0.875rem; color: #94a3b8; margin-top: 0.375rem;">
                    Select your campus and program to generate the access key and visit the portal.
                </p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <label style="font-size: 0.875rem; font-weight: 500;">Campus</label>
                    <select id="modal-campus-select" style="display: flex; height: 2.25rem; width: 100%; border-radius: 0.375rem; border: 1px solid #1e293b; background: #020817; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #f8fafc; outline: none;">
                        <option value="">Select Campus...</option>
                        <option value="Atate Campus">Atate Campus</option>
                        <option value="Carranglan Campus">Carranglan Campus</option>
                        <option value="Fort Magsaysay Campus">Fort Magsaysay Campus</option>
                        <option value="Gabaldon Campus">Gabaldon Campus</option>
                        <option value="Gen. Tinio St. Campus">Gen. Tinio St. Campus</option>
                        <option value="Papaya Campus">Papaya Campus</option>
                        <option value="Peñaranda Campus">Peñaranda Campus</option>
                        <option value="San Antonio Campus">San Antonio Campus</option>
                        <option value="San Isidro Campus">San Isidro Campus</option>
                        <option value="San Leonardo Campus">San Leonardo Campus</option>
                        <option value="Sto. Domingo Campus">Sto. Domingo Campus</option>
                    </select>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <label style="font-size: 0.875rem; font-weight: 500;">Program</label>
                    <select id="modal-program-select" style="display: flex; height: 2.25rem; width: 100%; border-radius: 0.375rem; border: 1px solid #1e293b; background: #020817; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #f8fafc; outline: none;" disabled>
                        <option value="">Select Program...</option>
                    </select>
                </div>
            </div>

            <div style="font-size: 0.8rem; color: #94a3b8; background-color: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 0.5rem; text-align: left;">
                If your campus or program is missing, it means that you are not supposed to access the enrollment portal. If you want to check your grades or COR, go to the <a href="login.html" style="color: #f97316; text-decoration: underline;">Official NEUST Grades Viewer</a>.
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
                <button id="modal-cancel-btn" style="height: 2.25rem; box-sizing: border-box; padding: 0 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; border: 1px solid #1e293b; background: transparent; color: #f8fafc; cursor: pointer;">
                    Cancel
                </button>
                <button id="modal-navigate-btn" style="height: 2.25rem; box-sizing: border-box; padding: 0 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; background: #f97316; color: #000000; cursor: not-allowed; opacity: 0.5; border: none; transition: opacity 0.2s;">
                    Navigate to Portal
                </button>
            </div>
        </div>
    </div>
</div>

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

// Modal Logic
const modal = document.getElementById('custom-portal-modal');
const modalTitle = document.getElementById('modal-server-title');
const campusSelect = document.getElementById('modal-campus-select');
const programSelect = document.getElementById('modal-program-select');
const cancelBtn = document.getElementById('modal-cancel-btn');
const navigateBtn = document.getElementById('modal-navigate-btn');
const closeBtn = document.getElementById('modal-close');
let lastSelectedServer = 'Server 1';

const programsList = [
    "Accelerated Vocational Training Program",
    "Bachelor of Arts in Literary and Cultural Studies",
    "Bachelor of Industrial Technology",
    "Bachelor of Science in Biology",
    "Bachelor of Science in Chemistry",
    "Bachelor of Science in Environmental Science",
    "Bachelor of Science in Food Technology",
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Computer Science",
    "Bachelor of Arts in Communication",
    "Bachelor of Science in Criminology"
];

campusSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if(val) {
        programSelect.disabled = false;
        programSelect.innerHTML = '<option value="">Select Program...</option>' + programsList.map(p => \`<option value="\${p}">\${p}</option>\`).join('');
    } else {
        programSelect.disabled = true;
        programSelect.innerHTML = '<option value="">Select Program...</option>';
        programSelect.value = '';
    }
    checkNavigable();
});

programSelect.addEventListener('change', checkNavigable);

function checkNavigable() {
    if(campusSelect.value && programSelect.value) {
        navigateBtn.style.opacity = '1';
        navigateBtn.style.cursor = 'pointer';
        navigateBtn.disabled = false;
    } else {
        navigateBtn.style.opacity = '0.5';
        navigateBtn.style.cursor = 'not-allowed';
        navigateBtn.disabled = true;
    }
}

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

navigateBtn.addEventListener('click', () => {
    if(!navigateBtn.disabled) {
        const urlParams = new URLSearchParams();
        urlParams.set('server', lastSelectedServer);
        urlParams.set('campus', campusSelect.value);
        urlParams.set('course', programSelect.value);
        window.location.href = 'login.html?' + urlParams.toString();
    }
});

// Portal Access Button Logic
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Access Portal')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Find which server was clicked
            const card = btn.closest('[data-slot="card"]');
            if (card) {
                const titleNode = card.querySelector('[data-slot="card-title"]');
                if (titleNode) {
                    lastSelectedServer = titleNode.textContent.trim();
                }
            }
            
            modalTitle.textContent = lastSelectedServer;
            campusSelect.value = '';
            programSelect.value = '';
            campusSelect.dispatchEvent(new Event('change')); // resets programs
            
            modal.style.display = 'flex';
        });
    } else if (btn.textContent.includes('Open Grades Viewer')) {
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

html = html.replace('</body>', modalHtml);

fs.writeFileSync('C:/Users/liuxs/.gemini/antigravity/scratch/website_copy/index.html', html);
console.log('Successfully injected modal logic into index.html');
