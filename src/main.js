"use strict";
let canvas = document.querySelector("canvas");
let cx = canvas.getContext("2d");
cx.rect(0, 0, canvas.width, canvas.height);
cx.stroke();
let n = 5;
DrawTowers(Move1(n, [[1, 2, 3, 4, 5], 0], [[], 2], [[], 1]));
function DrawTowers(moveList) {
    let t1 = Array(n).fill(0).map((_, index) => index + 1).reverse();
    let t2 = [];
    let t3 = [];
    let getRingWidth = (rank) => (canvas.width / 3) * .80 * (rank / 5);
    let getXPos = (towerIndex, width) => canvas.width / 2 + (towerIndex - 1) * canvas.width * .3 - width / 2;
    [t1, t2, t3].forEach((tower, towerIndex) => {
        tower.forEach((item, itemIndex) => {
            cx.rect(getXPos(towerIndex, getRingWidth(item)), canvas.height - itemIndex * 100 - 100, getRingWidth(item), 20);
        });
    });
    cx.stroke();
    let step = 0;
    let int = setInterval(DrawMove1, 1000, moveList, getRingWidth, getXPos);
    function DrawMove(moveList, towers, getRingWidth, getXPos) {
        let move = moveList[step];
        let srcTowerColumn = move[0];
        let destTowerColumn = move[1];
        let srcTower = towers[srcTowerColumn];
        let destTower = towers[destTowerColumn];
        let srcTowerSize = srcTower.length;
        let srcTopRingSize = getRingWidth(srcTower.slice(-1)[0]);
        cx.beginPath();
        cx.clearRect(getXPos(srcTowerColumn, srcTopRingSize) - 1, canvas.height - srcTowerSize * 100 - 2, srcTopRingSize + 2, 24);
        destTower.push(srcTower.pop());
        let destTowerSize = destTower.length;
        let destTopRingSize = getRingWidth(destTower.slice(-1)[0]);
        cx.fillRect(getXPos(destTowerColumn, destTopRingSize), canvas.height - destTowerSize * 100, destTopRingSize, 20);
        cx.closePath();
        cx.stroke();
        step++;
        if (step >= moveList.length) {
            clearInterval(int);
        }
    }
    function DrawMove1(moveHistory, getRingWidth, getXPos) {
        let towers = moveHistory.slice(3 * step, 3 * (step + 1));
        towers.forEach((tower, index) => tower[0].forEach((ring, index) => cx.fillRect(getXPos(tower[1], getRingWidth(ring)), canvas.height - tower[0].length * 100, getRingWidth(ring), 20)));
        cx.stroke();
        step++;
        if (step >= moveList.length) {
            clearInterval(int);
        }
    }
}
function Move(items, src, dest, aux) {
    if (items > 0) {
        return Move(items - 1, src, aux, dest).concat([[src, dest]], Move(items - 1, aux, dest, src));
    }
    else {
        return [];
    }
}
function Move1(items, src, dest, aux) {
    if (items > 1) {
        return [].concat(Move1(items - 1, src, aux, dest), [src, dest, aux], Move1(items - 1, aux, dest, src));
    }
    else {
        let newSrc = [src[0].slice(0, -2), src[1]];
        let movedRing = src[0].slice(-1)[0];
        let newDest = [dest[0].concat(movedRing), dest[1]];
        return [].concat(newSrc, newDest, aux);
    }
}
