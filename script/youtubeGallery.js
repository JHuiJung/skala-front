const videoFrame = document.getElementById("youtube-player");
const videoTitle = document.getElementById("video-title");
const prevBtn = document.getElementById("video-prev");
const nextBtn = document.getElementById("video-next");

if (videoFrame && prevBtn && nextBtn) {
    const videoIds = [
        "Fg2I26-oP-A",
        "F91XI5FD7a8",
        "KXENPAMm9gY",
        "Q-Ov9P9uJXg",
        "6NR3X4BcFYk",
        "ZYtt32tv9_k",
        "WmRrXCR4iR4",
    ];

    let currentIndex = 0;

    function renderVideo() {
        const videoId = videoIds[currentIndex];
        videoFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}`;

        if (videoTitle) {
            videoTitle.textContent = "";

            fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
                .then((res) => res.json())
                .then((data) => {
                    videoTitle.textContent = data.title || "";
                })
                .catch(() => {
                    videoTitle.textContent = "";
                });
        }
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
        renderVideo();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % videoIds.length;
        renderVideo();
    });

    renderVideo();
}