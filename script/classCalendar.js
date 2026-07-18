const calendarTitle = document.getElementById("calendar-title");
const calendarBody = document.getElementById("calendar-body");
const prevBtn = document.getElementById("calendar-prev");
const nextBtn = document.getElementById("calendar-next");

if (calendarTitle && calendarBody && prevBtn && nextBtn) {
    const MIN_YEAR = 2026;
    const MIN_MONTH = 7;
    const MAX_YEAR = 2026;
    const MAX_MONTH = 12;
    const SUBJECT_COLUMN_INDEX = 3;
    const CURRICULUM_START_KEY = "2026-07-14";
    const CURRICULUM_END_KEY = "2026-12-11";

    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;

    // 오늘이 범위(2026.07~2026.12) 밖이면 가장 가까운 경계로 고정
    if (currentYear < MIN_YEAR || (currentYear === MIN_YEAR && currentMonth < MIN_MONTH)) {
        currentYear = MIN_YEAR;
        currentMonth = MIN_MONTH;
    } else if (currentYear > MAX_YEAR || (currentYear === MAX_YEAR && currentMonth > MAX_MONTH)) {
        currentYear = MAX_YEAR;
        currentMonth = MAX_MONTH;
    }

    // CSV에서 채워지는 날짜별 과목명 (key: "YYYY-MM-DD")
    const subjectByDate = {};

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

    function isAtMin(year, month) {
        return year === MIN_YEAR && month === MIN_MONTH;
    }

    function isAtMax(year, month) {
        return year === MAX_YEAR && month === MAX_MONTH;
    }

    function renderCalendar(year, month) {
        calendarTitle.textContent = `${year}년 ${month}월`;

        const firstDay = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();

        calendarBody.innerHTML = "";

        let date = 1;
        for (let week = 0; week < 6 && date <= daysInMonth; week++) {
            const row = document.createElement("tr");

            for (let day = 0; day < 7; day++) {
                const cell = document.createElement("td");

                if ((week === 0 && day < firstDay) || date > daysInMonth) {
                    // 빈 칸
                } else {
                    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
                    const subject = subjectByDate[dateKey];

                    const dateEl = document.createElement("span");
                    dateEl.className = "calendar-date";
                    dateEl.textContent = date;

                    const subjectEl = document.createElement("span");
                    subjectEl.className = "calendar-subject";
                    subjectEl.textContent =
                        dateKey < CURRICULUM_START_KEY || dateKey > CURRICULUM_END_KEY
                            ? " "
                            : subject || "휴일";

                    cell.appendChild(dateEl);
                    cell.appendChild(subjectEl);

                    date++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }

        prevBtn.style.visibility = isAtMin(year, month) ? "hidden" : "visible";
        nextBtn.style.visibility = isAtMax(year, month) ? "hidden" : "visible";
    }

    prevBtn.addEventListener("click", () => {
        if (isAtMin(currentYear, currentMonth)) return;

        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }

        renderCalendar(currentYear, currentMonth);
    });

    nextBtn.addEventListener("click", () => {
        if (isAtMax(currentYear, currentMonth)) return;

        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }

        renderCalendar(currentYear, currentMonth);
    });

    fetch("../CSV/curriculum.csv")
        .then((res) => res.text())
        .then((text) => {
            const lines = text.trim().split(/\r?\n/);

            for (let i = 2; i < lines.length; i++) {
                const cols = parseCsvLine(lines[i]);
                const dateKey = cols[0];

                if (dateKey) {
                    subjectByDate[dateKey] = (cols[SUBJECT_COLUMN_INDEX] || "").trim();
                }
            }
        })
        .catch(() => {
            // CSV 로드 실패해도 달력 자체는 "휴일"로 채워서 보여줌
        })
        .finally(() => {
            renderCalendar(currentYear, currentMonth);
        });
}