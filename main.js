let canvas = document.querySelector("canvas")
let cx = canvas.getContext("2d");

cx.rect(0, 0, canvas.width, canvas.height);
cx.stroke();

let n = 5;
DrawTowers(Move(n, 0, 2, 1), n)

function DrawTowers(moveList, n){
    let t1 = Array(n).fill(0).map((_,index)=>index+1).reverse();
    let t2 = []
    let t3 = []

    let getRingWidth = (rank)=>(canvas.width/3)*.80*(rank/5);
    let getXPos = (towerIndex, width) => canvas.width/2 + (towerIndex-1)*canvas.width*.3 - width/2;

    [t1, t2, t3].forEach((tower, towerIndex) => {
        tower.forEach((item,itemIndex) => {
            cx.rect(getXPos(towerIndex, getRingWidth(item)), canvas.height - itemIndex*100 - 100, getRingWidth(item), 20)
        });
    });
    cx.stroke()
    let step = 0
    let int = setInterval(DrawMove, 1000, moveList, [t1, t2, t3], getRingWidth, getXPos)


    function DrawMove(moveList, towers, getRingWidth, getXPos){
        let move = moveList[step]
        let srcTowerColumn = move[0]
        let destTowerColumn = move[1]

        let srcTower = towers[srcTowerColumn]
        let destTower = towers[destTowerColumn]


        let srcTowerSize = srcTower.length
        let srcTopRingSize = getRingWidth(srcTower.slice(-1)[0])
        cx.beginPath()
        cx.clearRect(getXPos(srcTowerColumn, srcTopRingSize)-1, canvas.height - srcTowerSize*100 - 2, srcTopRingSize+2, 24)
        destTower.push(srcTower.pop())

        let destTowerSize = destTower.length
        let destTopRingSize = getRingWidth(destTower.slice(-1)[0])

        debugger;
        cx.fillRect(getXPos(destTowerColumn, destTopRingSize), canvas.height - destTowerSize*100, destTopRingSize, 20)
        cx.closePath()
        cx.stroke()

        step++;
        if (step >= moveList.length){
            clearInterval(int)
        }
    }
}

function Move(items, src, dest, aux){
    if (items > 0){
        return [].concat(Move(items-1, src, aux, dest), [[src, dest]], Move(items-1, aux, dest, src))
    }else{
        return []
    }
}