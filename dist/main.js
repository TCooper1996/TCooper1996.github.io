var canvas = document.querySelector("canvas");
var cx = canvas.getContext("2d");
cx.rect(0, 0, canvas.width, canvas.height);
cx.stroke();
var n = 5;
DrawTowers(Move(n, 0, 2, 1), n);
function DrawTowers(moveList, n) {
    var t1 = Array(n).fill(0).map(function (_, index) { return index + 1; }).reverse();
    var t2 = [];
    var t3 = [];
    var getRingWidth = function (rank) { return (canvas.width / 3) * .80 * (rank / 5); };
    var getXPos = function (towerIndex, width) { return canvas.width / 2 + (towerIndex - 1) * canvas.width * .3 - width / 2; };
    [t1, t2, t3].forEach(function (tower, towerIndex) {
        tower.forEach(function (item, itemIndex) {
            cx.rect(getXPos(towerIndex, getRingWidth(item)), canvas.height - itemIndex * 100 - 100, getRingWidth(item), 20);
        });
    });
    cx.stroke();
    var step = 0;
    var int = setInterval(DrawMove, 1000, moveList, [t1, t2, t3], getRingWidth, getXPos);
    function DrawMove(moveList, towers, getRingWidth, getXPos) {
        var move = moveList[step];
        var srcTowerColumn = move[0];
        var destTowerColumn = move[1];
        var srcTower = towers[srcTowerColumn];
        var destTower = towers[destTowerColumn];
        var srcTowerSize = srcTower.length;
        var srcTopRingSize = getRingWidth(srcTower.slice(-1)[0]);
        cx.beginPath();
        cx.clearRect(getXPos(srcTowerColumn, srcTopRingSize) - 1, canvas.height - srcTowerSize * 100 - 2, srcTopRingSize + 2, 24);
        destTower.push(srcTower.pop());
        var destTowerSize = destTower.length;
        var destTopRingSize = getRingWidth(destTower.slice(-1)[0]);
        cx.fillRect(getXPos(destTowerColumn, destTopRingSize), canvas.height - destTowerSize * 100, destTopRingSize, 20);
        cx.closePath();
        cx.stroke();
        step++;
        if (step >= moveList.length) {
            clearInterval(int);
        }
    }
}
function Move(items, src, dest, aux) {
    if (items > 0) {
        return [].concat(Move(items - 1, src, aux, dest), [[src, dest]], Move(items - 1, aux, dest, src));
    }
    else {
        return [];
    }
}
