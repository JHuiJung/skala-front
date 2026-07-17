const monsterEyes = document.querySelectorAll(".monster-eye-Left, .monster-eye-Right");
const monsterBody = document.querySelector(".monster-wrap");
let lastAngle = null;

if (monsterEyes.length > 0 && monsterBody) {
    document.addEventListener("mousemove", (e) => {
        const rect = monsterBody.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        // 0도 = 마우스가 몬스터 위쪽에 있을 때 (atan2 기준 -90도를 0도로 맞추기 위해 +90 보정)
        const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        // -180~180 경계에서 각도가 훌쩍 뛰어서 transition이 한 바퀴 도는 것처럼
        // 보이는 문제를 막기 위해, 이전 각도에서 가장 가까운 방향으로만 이어지도록 unwrap
        if (lastAngle === null) lastAngle = rawAngle;
        let delta = (rawAngle - lastAngle) % 360;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const angle = lastAngle + delta;
        lastAngle = angle;

        monsterEyes.forEach((eye) => {
            eye.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        });
    });
}