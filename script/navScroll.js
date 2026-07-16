(function () {
    var nav = document.querySelector("nav");
    var lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        var currentScrollY = window.scrollY;

        if (currentScrollY < 50) {
            nav.classList.remove("nav-hidden");
            nav.classList.remove("nav-scrolled");
        } else if (currentScrollY > lastScrollY) {
            nav.classList.add("nav-hidden");
            nav.classList.remove("nav-scrolled");
        } else {
            nav.classList.remove("nav-hidden");
            nav.classList.add("nav-scrolled");
        }

        lastScrollY = currentScrollY;
    });
})();
