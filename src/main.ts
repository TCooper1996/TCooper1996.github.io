let canvas:HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
let cx:CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

cx.rect(0, 0, canvas.width, canvas.height);
cx.stroke();

let n:number = 5;
DrawTowers(Move1(n, [[1, 2, 3, 4, 5], 0], [[], 2], [[], 1]))

function DrawTowers(moveList: [number[], number][]){
    let t1:number[] = Array(n).fill(0).map((_,index)=>index+1).reverse();
    let t2:number[] = []
    let t3:number[] = []

    let getRingWidth = (rank:number)=>(canvas.width/3)*.80*(rank/5);
    let getXPos = (towerIndex:number, width:number) => canvas.width/2 + (towerIndex-1)*canvas.width*.3 - width/2;

    [t1, t2, t3].forEach((tower, towerIndex) => {
        tower.forEach((item,itemIndex) => {
            cx.rect(getXPos(towerIndex, getRingWidth(item)), canvas.height - itemIndex*100 - 100, getRingWidth(item), 20)
        });
    });
    cx.stroke()
    let step = 0
    let int = setInterval(DrawMove1, 1000, moveList, getRingWidth, getXPos)


    function DrawMove(moveList:number[][], towers:number[][], getRingWidth:(r: number) => number, getXPos: (r: number, s: number) => number){
        let move = moveList[step]
        let srcTowerColumn = move[0]
        let destTowerColumn = move[1]

        let srcTower = towers[srcTowerColumn]
        let destTower = towers[destTowerColumn]


        let srcTowerSize = srcTower.length
        let srcTopRingSize = getRingWidth(srcTower.slice(-1)[0])
        cx.beginPath()
        cx.clearRect(getXPos(srcTowerColumn, srcTopRingSize)-1, canvas.height - srcTowerSize*100 - 2, srcTopRingSize+2, 24)
        destTower.push(srcTower.pop() as number)

        let destTowerSize = destTower.length
        let destTopRingSize = getRingWidth(destTower.slice(-1)[0])

        cx.fillRect(getXPos(destTowerColumn, destTopRingSize), canvas.height - destTowerSize*100, destTopRingSize, 20)
        cx.closePath()
        cx.stroke()

        step++;
        if (step >= moveList.length){
            clearInterval(int)
        }
    }

    function DrawMove1(moveHistory: [number[], number][], getRingWidth:(r: number) => number, getXPos: (r: number, s: number) => number){
        let towers = moveHistory.slice(3*step, 3*(step+1))

        towers.forEach((tower, index) => 
            tower[0].forEach((ring, index) => 
                cx.fillRect(getXPos(tower[1], getRingWidth(ring)), canvas.height - tower[0].length*100, getRingWidth(ring), 20))
        )

        cx.stroke()

        step++;
        if (step >= moveList.length){
            clearInterval(int)
        }
    }
}

function Move(items:number, src:number, dest:number, aux:number):number[][]{
    if (items > 0){
        return Move(items-1, src, aux, dest).concat([[src, dest]], Move(items-1, aux, dest, src))
    }else{
        return []
    }
}

function Move1(items:number, src:[number[], number], dest:[number[], number], aux:[number[], number]):[number[], number][]{
    if (items > 1){
        return ([] as [number[], number][]).concat(Move1(items-1, src, aux, dest), [src, dest, aux], Move1(items-1, aux, dest, src));
    }else{
        let newSrc: [number[], number] = [src[0].slice(0, -2), src[1]];
        let movedRing:number = src[0].slice(-1)[0];
        let newDest: [number[], number] = [dest[0].concat(movedRing), dest[1]];
        return ([] as [number[], number][]).concat(newSrc, newDest, aux);
    }
}