function showMyBag() {
    var myBag = [
        { name: "노트북", count: 1 },
        { name: "볼펜", count: 3 },
        { name: "지갑", count: 1 },
        { name: "이어폰", count: 1 },
        { name: "생수", count: 2 }
    ];

    var result = "🎒 내 가방 속 물품\n\n";

    for (var i = 0; i < myBag.length; i++) {
        result += myBag[i].name + " - " + myBag[i].count + "개\n";
    }

    alert(result);
}
