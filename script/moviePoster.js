const posterImg = document.getElementById("poster-img");
const posterTitle = document.getElementById("poster-title");
const posterYear = document.getElementById("poster-year");
const posterStory = document.getElementById("poster-story");

if (posterImg && posterTitle && posterYear && posterStory) {
    const posterFiles = {
        1: "poster_01_100m.png",
        2: "poster_02_Whiplash.png",
        3: "poster_03_TheGreatShowMan.png",
        4: "poster_04_Mickey17.png",
        5: "poster_05_LoockBack.png",
    };

    function parseCsvLine(line) {
        const result = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (inQuotes) {
                if (char === '"') {
                    if (line[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    current += char;
                }
            } else if (char === '"') {
                inQuotes = true;
            } else if (char === ",") {
                result.push(current);
                current = "";
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    fetch("../CSV/poster.csv")
        .then((res) => res.text())
        .then((text) => {
            const lines = text.trim().split(/\r?\n/);
            const movies = [];

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i]) continue;

                const cols = parseCsvLine(lines[i]);
                movies.push({
                    number: Number(cols[0]),
                    name: cols[1],
                    year: cols[2],
                    story: cols[3],
                });
            }

            // 오늘의 영화추천 = (날짜 % 포스터 총 개수) + 1번 영화
            const today = new Date();
            const pickNumber = (today.getDate() % movies.length) + 1;
            const movie = movies.find((m) => m.number === pickNumber);

            if (movie) {
                posterImg.src = `../media/posters/${posterFiles[movie.number]}`;
                posterImg.alt = `${movie.name} 포스터`;
                posterTitle.textContent = movie.name;
                posterYear.textContent = movie.year;
                posterStory.textContent = movie.story;
            }
        });
}