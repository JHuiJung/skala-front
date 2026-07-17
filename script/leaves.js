const LEAF_COUNT = 10;
const LEAF_SIZE = 80;
const SPAWN_Y = -100;
const RESET_Y = 800;

const leafContainer = document.getElementById("leaf-container");

if (leafContainer) {
    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getLeafSrc() {
        const isDark = document.body.classList.contains("dark-mode");
        return isDark
            ? "../media/Icons/Icon_Leaf_Dark.png"
            : "../media/Icons/Icon_Leaf_Light.png";
    }

    function randomizeLeaf(leaf, spawnAnywhere) {
        leaf.x = randomRange(0, window.innerWidth - LEAF_SIZE);
        leaf.y = spawnAnywhere ? randomRange(SPAWN_Y, RESET_Y) : SPAWN_Y;
        leaf.speedY = randomRange(40, 80);
        leaf.swayAmplitude = randomRange(15, 50);
        leaf.swayFrequency = randomRange(0.5, 1.5);
        leaf.swayPhase = randomRange(0, Math.PI * 2);
        leaf.rotation = randomRange(0, 360);
        leaf.flipped = Math.random() < 0.5;
        leaf.time = 0;
    }

    function applyTransform(leaf) {
        const sway = Math.sin(leaf.time * leaf.swayFrequency + leaf.swayPhase) * leaf.swayAmplitude;
        const flip = leaf.flipped ? -1 : 1;
        leaf.el.style.transform =
            `translate(${leaf.x + sway}px, ${leaf.y}px) rotate(${leaf.rotation}deg) scaleX(${flip})`;
    }

    const leaves = [];

    for (let i = 0; i < LEAF_COUNT; i++) {
        const img = document.createElement("img");
        img.className = "leaf";
        img.alt = "";
        img.src = getLeafSrc();
        leafContainer.appendChild(img);

        const leaf = { el: img };
        randomizeLeaf(leaf, true);
        applyTransform(leaf);
        leaves.push(leaf);
    }

    let lastTime = performance.now();

    function animate(now) {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        leaves.forEach((leaf) => {
            leaf.time += dt;
            leaf.y += leaf.speedY * dt;

            if (leaf.y >= RESET_Y) {
                randomizeLeaf(leaf, false);
            }

            applyTransform(leaf);
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // 다크모드 토글 시 현재 떨어지는 나뭇잎들의 이미지를 즉시 교체
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            leaves.forEach((leaf) => {
                leaf.el.src = getLeafSrc();
            });
        });
    }
}