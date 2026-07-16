function startUpDownGame() {
    var computerNum = Math.floor(Math.random() * 50) + 1;
    var tries = 0;

    while (true) {
        var input = prompt("1부터 50 사이의 숫자를 맞춰보세요.");

        if (input === null) {
            return;
        }

        var guess = Number(input);
        tries++;

        if (guess > computerNum) {
            alert("Down!");
        } else if (guess < computerNum) {
            alert("Up!");
        } else {
            alert("축하합니다! " + tries + "번 만에 맞추셨습니다.");
            return;
        }
    }
}
