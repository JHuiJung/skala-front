const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const nav = document.querySelector("nav");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        document.body.style.overflow = isOpen ? "hidden" : "";

        if (nav) {
            nav.classList.toggle("nav-hidden", isOpen);
        }
    });
}