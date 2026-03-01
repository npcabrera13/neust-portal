// mobile_prank.js — Broken LCD screen + jumpscare for mobile users
window.triggerMobilePrank = function () {
    const skipRedirect = localStorage.getItem('skipPrankRedirect') === 'true';
    const delaySec = parseInt(localStorage.getItem('prankRedirectDelay')) || 5;
    const jumpscareUrl = localStorage.getItem('prankJumpscareUrl') || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const redirectUrl = localStorage.getItem('prankRedirectUrl') || 'https://youtube.com/shorts/eWa7ksQb2Yc?si=_2Cy3zyG82c5VWf_';

    // Force fullscreen
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => { });
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();

    // === PHASE 1: Broken LCD effect ===
    const overlay = document.createElement('div');
    overlay.id = 'lcd-prank';
    overlay.style.cssText = `
        position:fixed; top:0; left:0; width:100vw; height:100vh;
        z-index:999999; background:#000; overflow:hidden;
    `;
    document.body.appendChild(overlay);

    // VERTICAL glitch bars (full height, thin width)
    const colors = ['#ff0044', '#00ff88', '#0066ff', '#ff00ff', '#ffff00', '#00ffff', '#ffffff', '#000000'];
    const bars = [];

    for (let i = 0; i < 50; i++) {
        const bar = document.createElement('div');
        const w = Math.random() * 20 + 1;
        bar.style.cssText = `
            position:absolute;
            top:0;
            height:100vh;
            width:${w}px;
            left:${Math.random() * 100}%;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            opacity:${Math.random() * 0.8 + 0.2};
        `;
        overlay.appendChild(bar);
        bars.push(bar);
    }

    // Vertical scanlines
    const scanlines = document.createElement('div');
    scanlines.style.cssText = `
        position:absolute; top:0; left:0; width:100%; height:100%;
        background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.3) 2px,
            rgba(0,0,0,0.3) 4px
        );
        pointer-events:none;
    `;
    overlay.appendChild(scanlines);

    // Static noise canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.15;';
    canvas.width = 200;
    canvas.height = 200;
    overlay.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Flicker
    const flickerInterval = setInterval(() => {
        bars.forEach(bar => {
            bar.style.left = Math.random() * 100 + '%';
            bar.style.width = (Math.random() * 25 + 1) + 'px';
            bar.style.background = colors[Math.floor(Math.random() * colors.length)];
            bar.style.opacity = Math.random() * 0.9 + 0.1;
            bar.style.transform = `translateX(${(Math.random() - 0.5) * 20}px)`;
        });

        const imgData = ctx.createImageData(200, 200);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 255;
            imgData.data[i] = v;
            imgData.data[i + 1] = v;
            imgData.data[i + 2] = v;
            imgData.data[i + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);

        if (Math.random() < 0.3) {
            overlay.style.background = Math.random() < 0.5 ? '#fff' : '#000';
            setTimeout(() => { overlay.style.background = '#000'; }, 50);
        }

        if (navigator.vibrate) navigator.vibrate(100);
    }, 80);

    // === PHASE 2: Jumpscare — open video in new tab + creepy sound ===
    setTimeout(() => {
        clearInterval(flickerInterval);

        // Open jumpscare video in new tab
        window.open(jumpscareUrl, '_blank');

        // Creepy sound via Web Audio API
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sawtooth';
            osc.frequency.value = 150;
            gain.gain.value = 0.6;
            osc.start();
            osc.frequency.linearRampToValueAtTime(3000, audioCtx.currentTime + 1);
            osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 2);
            setTimeout(() => { osc.stop(); }, 2500);
        } catch (e) { }

        if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 500]);

        // === PHASE 3: Redirect after remaining delay ===
        setTimeout(() => {
            if (!skipRedirect) {
                window.open(redirectUrl, '_blank');
            }
        }, Math.max((delaySec * 1000) - 2500, 2000));

    }, 2500);
};
