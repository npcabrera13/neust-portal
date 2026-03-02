// cursor_prank.js — Cursor Swarm Prank
window.triggerCursorPrank = function () {
    // Config from superadmin
    const skipRedirect = localStorage.getItem('skipPrankRedirect') === 'true';
    const delaySec = parseInt(localStorage.getItem('prankRedirectDelay')) || 5;
    const numCursors = parseInt(localStorage.getItem('prankCursorCount')) || 200;
    const redirectUrl = localStorage.getItem('prankRedirectUrl') || 'https://youtube.com/shorts/eWa7ksQb2Yc?si=_2Cy3zyG82c5VWf_';

    // 1. Force fullscreen
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => { });
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();

    let allowFullscreenReentry = true;

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && allowFullscreenReentry) {
            el.requestFullscreen().catch(() => { });
        }
    });

    // Hide real cursor and scrollbar
    const style = document.createElement('style');
    style.textContent = `
        * { cursor: none !important; }
        html, body { overflow: hidden !important; }
    `;
    document.head.appendChild(style);

    // Cover any iframes (like the Rickroll) with a transparent overlay
    // so the real cursor can't peek through on hover
    document.querySelectorAll('iframe').forEach(iframe => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:relative;display:inline-block;width:100%;';
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:999998;cursor:none;';
        wrapper.appendChild(overlay);
    });

    // Container
    const container = document.createElement('div');
    container.id = 'cursor-swarm';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999999;overflow:hidden;';
    document.body.appendChild(container);

    // Windows cursor SVG
    const cursorSvg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="23" viewBox="0 0 17 23"><path d="M0 0 L0 20 L5.5 14.5 L9.5 22 L12.5 20.5 L8.5 12.5 L15 11 Z" fill="white" stroke="black" stroke-width="1"/></svg>`)}`;

    const cursors = [];
    let isMoving = false;
    let stopTimer;
    let lastDeltaX = 0;
    let lastDeltaY = 0;

    // Spawn cursors spread across the ENTIRE screen
    for (let i = 0; i < numCursors; i++) {
        const img = document.createElement('img');
        img.src = cursorSvg;
        img.style.cssText = 'position:absolute;width:17px;height:23px;';

        // Random position across full viewport
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        img.style.left = x + 'px';
        img.style.top = y + 'px';
        container.appendChild(img);

        cursors.push({
            el: img,
            x: x,
            y: y,
            // Each cursor has its own random "wiggle" factor
            wiggleX: (Math.random() - 0.5) * 12,
            wiggleY: (Math.random() - 0.5) * 12
        });
    }

    // Track mouse MOVEMENT (deltas), not position
    window.addEventListener('mousemove', (e) => {
        lastDeltaX = e.movementX;
        lastDeltaY = e.movementY;
        isMoving = true;
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => {
            isMoving = false;
            lastDeltaX = 0;
            lastDeltaY = 0;
        }, 80);
    });

    // Touch support for phones — taps AND drags both trigger chaos
    let lastTouchX = 0;
    let lastTouchY = 0;
    window.addEventListener('touchstart', (e) => {
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        // Tap = burst of random movement
        lastDeltaX = (Math.random() - 0.5) * 30;
        lastDeltaY = (Math.random() - 0.5) * 30;
        isMoving = true;
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => {
            isMoving = false;
            lastDeltaX = 0;
            lastDeltaY = 0;
        }, 300);
    });
    window.addEventListener('touchmove', (e) => {
        const tx = e.touches[0].clientX;
        const ty = e.touches[0].clientY;
        lastDeltaX = tx - lastTouchX;
        lastDeltaY = ty - lastTouchY;
        lastTouchX = tx;
        lastTouchY = ty;
        isMoving = true;
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => {
            isMoving = false;
            lastDeltaX = 0;
            lastDeltaY = 0;
        }, 80);
    });

    // Animation: each cursor moves in the SAME general direction as the real mouse
    // but with random wiggle added so they scatter
    function animate() {
        if (isMoving) {
            cursors.forEach(c => {
                // Move in same direction as real cursor + random wiggle
                c.x += lastDeltaX + c.wiggleX;
                c.y += lastDeltaY + c.wiggleY;

                // Wrap around screen edges so they never disappear
                if (c.x < -20) c.x = window.innerWidth + 10;
                if (c.x > window.innerWidth + 20) c.x = -10;
                if (c.y < -25) c.y = window.innerHeight + 10;
                if (c.y > window.innerHeight + 25) c.y = -10;

                // Randomly change wiggle for chaos
                if (Math.random() < 0.1) c.wiggleX = (Math.random() - 0.5) * 12;
                if (Math.random() < 0.1) c.wiggleY = (Math.random() - 0.5) * 12;

                c.el.style.left = c.x + 'px';
                c.el.style.top = c.y + 'px';
            });
        }
        requestAnimationFrame(animate);
    }

    animate();

    // Redirect after configured delay
    if (!skipRedirect) {
        setTimeout(() => {
            // Stop re-entering fullscreen so the redirect works
            allowFullscreenReentry = false;
            // Exit fullscreen first
            if (document.fullscreenElement) {
                document.exitFullscreen().then(() => {
                    window.location.href = redirectUrl;
                }).catch(() => {
                    window.location.href = redirectUrl;
                });
            } else {
                window.location.href = redirectUrl;
            }
        }, delaySec * 1000);
    }
};
