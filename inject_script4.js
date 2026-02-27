const fs = require('fs');

try {
    let html = fs.readFileSync('C:/Users/liuxs/.gemini/antigravity/scratch/website_copy/index.html', 'utf8');

    // Strip out any previously injected broken scripts at the end
    html = html.replace(/<script id="injected-interactions">[\s\S]*?<\/script>/, '');
    html = html.replace(/<div id="custom-portal-modal">[\s\S]*?<\/div>\s*<script id="injected-interactions">[\s\S]*?<\/script>/, '');
    html = html.replace(/<footer id="disclaimer-footer">[\s\S]*?<\/footer>\s*<script id="injected-interactions">[\s\S]*?<\/script>/, '');

    const modalHtml = `
<div id="custom-portal-modal" style="display: none;" class="relative z-50">
    <!-- Overlay with fade animation -->
    <div id="custom-portal-overlay" class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" data-state="closed"></div>
    
    <!-- Dialog container with zoom animation -->
    <div class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div id="custom-portal-dialog" role="dialog" class="pointer-events-auto w-full max-w-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg" data-state="closed" style="background:#020817; color:#f8fafc; border-color:#1e293b;">
            
            <button id="modal-close" class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" style="background:transparent; border:none; color:white; cursor:pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                <span class="sr-only">Close</span>
            </button>
            
            <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                <h2 id="modal-server-title" class="text-lg font-semibold leading-none tracking-tight">Server 1</h2>
                <p class="text-sm text-muted-foreground" style="color:#94a3b8;">Select your campus and program to generate the access key and visit the portal.</p>
            </div>
            
            <div class="flex flex-col gap-4 py-4 mt-2">
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left">Campus</label>
                    <select id="modal-campus-select" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" style="background:#020817; border-color:#1e293b; color:#f8fafc;">
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
                
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left">Program</label>
                    <select id="modal-program-select" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled style="background:#020817; border-color:#1e293b; color:#f8fafc;">
                        <option value="">Select Program...</option>
                    </select>
                </div>
            </div>

            <div class="text-xs text-muted-foreground bg-white/5 p-3 rounded-md mt-2" style="color:#94a3b8; background-color:rgba(255,255,255,0.05); text-align:left;">
                If your campus or program is missing, it means that you are not supposed to access the enrollment portal. If you want to check your grades or COR, go to the <a href="login.html" class="text-primary hover:underline" style="color:#ea580c; text-decoration:underline;">Official NEUST Grades Viewer</a>.
            </div>

            <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                <button id="modal-cancel-btn" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0" style="background:transparent; border:1px solid #1e293b; color:white;">
                    Cancel
                </button>
                <button id="modal-navigate-btn" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md" style="background:#ea580c; color:black; opacity:0.5; pointer-events:none;" disabled>
                    Navigate to Portal
                </button>
            </div>
        </div>
    </div>
</div>

<footer id="disclaimer-footer" class="text-sm text-center pb-6 z-10" style="color:#94a3b8; width: 100%; pointer-events: none; margin-top: 2rem; position: relative;">
    <div style="pointer-events: auto; padding-bottom: 1rem;">
        This website is for school purposes only. The original website is <a href="https://neust-portal.link/" style="color:#ea580c; text-decoration:underline;">https://neust-portal.link/</a>.
    </div>
</footer>

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
        ctx.fillStyle = '#ea580c';
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
            } else {
                 setTimeout(() => content.setAttribute('hidden', ''), 150);
            }
        });
    }
});

// Modal Logic
const modal = document.getElementById('custom-portal-modal');
const modalOverlay = document.getElementById('custom-portal-overlay');
const modalDialog = document.getElementById('custom-portal-dialog');

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

function checkNavigable() {
    if(campusSelect.value && programSelect.value) {
        navigateBtn.style.opacity = '1';
        navigateBtn.style.pointerEvents = 'auto';
        navigateBtn.disabled = false;
    } else {
        navigateBtn.style.opacity = '0.5';
        navigateBtn.style.pointerEvents = 'none';
        navigateBtn.disabled = true;
    }
}

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

function openModal() {
    modal.style.display = 'block';
    
    // Trigger animation classes
    setTimeout(() => {
        modalOverlay.setAttribute('data-state', 'open');
        modalDialog.setAttribute('data-state', 'open');
    }, 10);
}

function closeModal() {
    // Trigger closing animation
    modalOverlay.setAttribute('data-state', 'closed');
    modalDialog.setAttribute('data-state', 'closed');
    
    // Wait for the duration-200 animation (or 150ms tailwind slide-out) to end before hiding
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200);
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
            
            openModal();
        });
    } else if (btn.textContent.includes('Open Grades Viewer')) {
        btn.addEventListener('click', (e) => {
             e.preventDefault();
             e.stopPropagation();
             window.location.href = 'login.html';
        });
    }
});
</script>
</body>
`;

    // Append the disclaimer text just before the closing body
    html = html.replace('</body>', modalHtml);
    fs.writeFileSync('C:/Users/liuxs/.gemini/antigravity/scratch/website_copy/index.html', html);
    console.log('Successfully injected animated modal and disclaimer into index.html');
} catch (e) {
    console.error(e);
    process.exit(1);
}
