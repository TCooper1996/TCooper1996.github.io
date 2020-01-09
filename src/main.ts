let colors = ["red", "orange", "yellow", "green", "blue", "purple"]


let canvas:HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
let cx:CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

cx.rect(0, 0, canvas.width, canvas.height);
cx.stroke();

let n:number = 6;
DrawTowers(move(n, 0, 2, 1), n);

function DrawTowers(moveList: number[][], n:number){
    let t1:number[] = Array(n).fill(0).map((_,index)=>index).reverse()
    let t2:number[] = []
    let t3:number[] = []

    let getRingWidth = (rank:number)=>(canvas.width/3)*.80*((rank+1)/5);
    let getXPos = (towerColumn:number, width:number) => canvas.width/2 + (towerColumn - 1)*canvas.width*.3 - width/2;

    [t1, t2, t3].forEach((tower, towerIndex) => {
        tower.forEach((item,itemIndex) => {
            cx.fillStyle = colors[item]
            cx.fillRect(getXPos(towerIndex, getRingWidth(item)), (canvas.height - 50) - (n - (item + 1))*50, getRingWidth(item), 20)
        });
    });
    cx.stroke()
    let step = 0
    let int = setInterval(DrawMove, 250, moveList, [t1, t2, t3], getRingWidth, getXPos)


    function DrawMove(moveList:number[][], towers:number[][], getRingWidth:(r: number) => number, getXPos: (r: number, s: number) => number){
        let move = moveList[step]
        let srcTowerColumn = move[0]
        let destTowerColumn = move[1]

        let srcTower = towers[srcTowerColumn]
        let destTower = towers[destTowerColumn]

        let srcTowerSize: number = srcTower.length
        let srcTopRingSize: number = getRingWidth(srcTower.slice(-1)[0])

        cx.beginPath()
        cx.clearRect(getXPos(srcTowerColumn, srcTopRingSize)-1, canvas.height - srcTowerSize*50 - 2, srcTopRingSize+2, 24)
        debugger;
        destTower.push(srcTower.pop() as number)

        let destTowerSize = destTower.length
        let destTopRingSize = getRingWidth(destTower.slice(-1)[0])
        cx.fillStyle = colors[destTower.slice(-1)[0]]
        debugger;
        cx.fillRect(getXPos(destTowerColumn, destTopRingSize), canvas.height - destTowerSize*50, destTopRingSize, 20)
        cx.closePath()
        cx.stroke()

        step++;
        if (step >= moveList.length){
            clearInterval(int)
        }
    }
}

function move(items:number, src:number, dest:number, aux:number):number[][]{
    if (items > 0){
        return move(items-1, src, aux, dest).concat([[src, dest]], move(items-1, aux, dest, src))
    }else{
        return []
    }
}
