"use strict";
let colors = ["red", "orange", "yellow", "green", "blue", "purple"];
let canvas = document.querySelector("canvas");
let cx = canvas.getContext("2d");
cx.rect(0, 0, canvas.width, canvas.height);
cx.stroke();
let n = 6;
DrawTowers(move(n, 0, 2, 1), n);
function DrawTowers(moveList, n) {
    let t1 = Array(n).fill(0).map((_, index) => index).reverse();
    let t2 = [];
    let t3 = [];
    let getRingWidth = (rank) => (canvas.width / 3) * .80 * ((rank + 1) / 5);
    let getXPos = (towerColumn, width) => canvas.width / 2 + (towerColumn - 1) * canvas.width * .3 - width / 2;
    [t1, t2, t3].forEach((tower, towerIndex) => {
        tower.forEach((item, itemIndex) => {
            cx.fillStyle = colors[item];
            cx.fillRect(getXPos(towerIndex, getRingWidth(item)), (canvas.height - 50) - (n - (item + 1)) * 50, getRingWidth(item), 20);
        });
    });
    cx.stroke();
    let step = 0;
    let int = setInterval(DrawMove, 250, moveList, [t1, t2, t3], getRingWidth, getXPos);
    function DrawMove(moveList, towers, getRingWidth, getXPos) {
        let move = moveList[step];
        let srcTowerColumn = move[0];
        let destTowerColumn = move[1];
        let srcTower = towers[srcTowerColumn];
        let destTower = towers[destTowerColumn];
        let srcTowerSize = srcTower.length;
        let srcTopRingSize = getRingWidth(srcTower.slice(-1)[0]);
        cx.beginPath();
        cx.clearRect(getXPos(srcTowerColumn, srcTopRingSize) - 1, canvas.height - srcTowerSize * 50 - 2, srcTopRingSize + 2, 24);
        debugger;
        destTower.push(srcTower.pop());
        let destTowerSize = destTower.length;
        let destTopRingSize = getRingWidth(destTower.slice(-1)[0]);
        cx.fillStyle = colors[destTower.slice(-1)[0]];
        debugger;
        cx.fillRect(getXPos(destTowerColumn, destTopRingSize), canvas.height - destTowerSize * 50, destTopRingSize, 20);
        cx.closePath();
        cx.stroke();
        step++;
        if (step >= moveList.length) {
            clearInterval(int);
        }
    }
}
function move(items, src, dest, aux) {
    if (items > 0) {
        return move(items - 1, src, aux, dest).concat([[src, dest]], move(items - 1, aux, dest, src));
    }
    else {
        return [];
    }
}
