const todayDateEl = document.getElementById("today-date");
const todaySubjectEl = document.getElementById("today-subject");
const todayProfessorEl = document.getElementById("today-professor");

if (todayDateEl && todaySubjectEl && todayProfessorEl) {
    // 205호 4반 열 위치 (날짜,요일,주차,과목/특강명,201호1반,202호2반,204호3반,205호4반, ...)
    const CLASS_COLUMN_INDEX = 7;

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

    function getTodayInfo() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = today.getMonth() + 1;
        const dd = today.getDate();
        const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

        return {
            display: `${yyyy}년 ${mm}월 ${dd}일 (${dayNames[today.getDay()]})`,
            key: `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`,
        };
    }

    const { display, key } = getTodayInfo();
    todayDateEl.textContent = display;

    fetch("../CSV/curriculum.csv")
        .then((res) => res.text())
        .then((text) => {
            const lines = text.trim().split(/\r?\n/);

            for (let i = 2; i < lines.length; i++) {
                const cols = parseCsvLine(lines[i]);

                if (cols[0] === key) {
                    const subject = (cols[3] || "").trim();
                    const professor = (cols[CLASS_COLUMN_INDEX] || "").trim();

                    todaySubjectEl.textContent = subject || "휴일";
                    todayProfessorEl.textContent = professor || "-";
                    return;
                }
            }

            // CSV에 오늘 날짜가 없는 경우
            todaySubjectEl.textContent = "휴일";
            todayProfessorEl.textContent = "-";
        })
        .catch(() => {
            todaySubjectEl.textContent = "시간표를 불러올 수 없습니다";
            todayProfessorEl.textContent = "-";
        });
}