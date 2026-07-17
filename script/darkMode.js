const darkModeToggle = document.getElementById("dark-mode-toggle");
const headerBgImg = document.querySelector(".header-bg");
const navIcons = document.querySelectorAll(".nav-right .social-icons img");

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");

        if (headerBgImg) {
            headerBgImg.src = isDark
                ? "../media/Imgs/header-bg-Dark.png"
                : "../media/Imgs/header-bg-Light.png";
        }

        navIcons.forEach((img) => {
            img.src = isDark
                ? img.src.replace("_Dark.png", "_Light.png")
                : img.src.replace("_Light.png", "_Dark.png");
        });

        darkModeToggle.textContent = isDark ? "☀️ 라이트모드" : "🌙 다크모드";
    });
}