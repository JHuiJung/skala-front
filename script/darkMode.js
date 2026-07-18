const darkModeToggle = document.getElementById("dark-mode-toggle");
const headerBgImg = document.querySelector(".header-bg");
const navIcons = document.querySelectorAll(".nav-right .social-icons img");

function applyDarkMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    if (headerBgImg) {
        headerBgImg.src = isDark
            ? "../media/Imgs/header-bg-Dark.png"
            : "../media/Imgs/header-bg-Light.png";
    }

    navIcons.forEach((img) => {
        if (isDark && img.src.includes("_Dark.png")) {
            img.src = img.src.replace("_Dark.png", "_Light.png");
        } else if (!isDark && img.src.includes("_Light.png")) {
            img.src = img.src.replace("_Light.png", "_Dark.png");
        }
    });

    if (darkModeToggle) {
        darkModeToggle.textContent = isDark ? "☀️ 라이트모드" : "🌙 다크모드";
    }
}

// 다른 페이지로 이동해도 다크모드 상태가 유지되도록, 저장된 값이 있으면 로드 시 바로 적용
if (localStorage.getItem("darkMode") === "1") {
    applyDarkMode(true);
}

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyDarkMode(isDark);
        localStorage.setItem("darkMode", isDark ? "1" : "0");
    });
}