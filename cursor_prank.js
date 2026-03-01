// cursor_prank.js
window.triggerCursorPrank = function () {
    // 1. Create a container for the fake cursors to keep the DOM clean
    const container = document.createElement('div');
    container.id = 'cursor-swarm-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none'; // so they don't block real clicks
    container.style.zIndex = '999999';
    document.body.appendChild(container);

    const cursors = [];
    const numCursors = 100;
    const speedMultiplier = 15; // Max pixels moved per frame when active
    let isMouseMoving = false;
    let stopTimeout;

    // Standard Windows default cursor SVG (base64)
    const cursorSvg = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICAgIDxwYXRoIGQ9Ik00LjUgMS41TDQuNSAyMS41TDExIDE1TDE1LjUgMjRMMTguNSAyMi41TDE0IDEzLjVMMjAuNSA4LjVMNC41IDEuNVoiIGZpbGw9IndoaXRlIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+`;

    for (let i = 0; i < numCursors; i++) {
        const img = document.createElement('img');
        img.src = cursorSvg;
        img.style.position = 'absolute';

        // Start them randomly on the screen
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;

        // Random velocity vector
        let vx = (Math.random() - 0.5) * speedMultiplier;
        let vy = (Math.random() - 0.5) * speedMultiplier;

        img.style.left = x + 'px';
        img.style.top = y + 'px';

        container.appendChild(img);

        cursors.push({ element: img, x, y, vx, vy });
    }

    // 2. Track mouse movement state
    window.addEventListener('mousemove', () => {
        isMouseMoving = true;
        clearTimeout(stopTimeout);
        // If mouse stops for 50ms, stop the swarm
        stopTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 50);
    });

    // 3. Animation Loop
    function animateCursors() {
        if (isMouseMoving) {
            cursors.forEach(c => {
                c.x += c.vx;
                c.y += c.vy;

                // Bounce off edges
                if (c.x < 0 || c.x > window.innerWidth) c.vx *= -1;
                if (c.y < 0 || c.y > window.innerHeight) c.vy *= -1;

                c.element.style.left = c.x + 'px';
                c.element.style.top = c.y + 'px';
            });
        }
        requestAnimationFrame(animateCursors);
    }

    // Start animation loop
    animateCursors();

    // 4. Redirect after 5 seconds
    setTimeout(() => {
        window.location.href = 'https://youtube.com/shorts/eWa7ksQb2Yc?si=_2Cy3zyG82c5VWf_';
    }, 5000);
};
