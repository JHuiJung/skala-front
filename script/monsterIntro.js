const monsterWrap = document.querySelector(".monster-wrap");

if (monsterWrap) {
    const alreadyPlayed = sessionStorage.getItem("monsterIntroPlayed");

    if (!alreadyPlayed) {
        monsterWrap.classList.add("monster-intro");
        document.documentElement.classList.remove("monster-intro-pending");
        sessionStorage.setItem("monsterIntroPlayed", "true");
    }
}