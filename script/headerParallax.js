const headerBg = document.querySelector(".header-bg");
const MAX_DISTANCE = 300;
const MAX_OFFSET = 20;

if (headerBg) {
    document.addEventListener("mousemove", (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const clampedDx = Math.max(-MAX_DISTANCE, Math.min(MAX_DISTANCE, dx));
        const clampedDy = Math.max(-MAX_DISTANCE, Math.min(MAX_DISTANCE, dy));

        const offsetX = -(clampedDx / MAX_DISTANCE) * MAX_OFFSET;
        const offsetY = -(clampedDy / MAX_DISTANCE) * MAX_OFFSET;

        headerBg.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
}