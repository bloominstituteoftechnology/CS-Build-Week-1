var width = 30;
var height = 30;
var canvasArr = [];
var speed = 150;
var running = false;
var count = 0
var gen = document.getElementById('counter')

function handleCellClick(e){
    if (!running){
        var pos = e.target.id.split('r')
        pos = pos[1].split('c')
        pos[0] = parseInt(pos[0])
        pos[1] = parseInt(pos[1])
        if(canvasArr[pos[0]][pos[1]] === 0){
            canvasArr[pos[0]][pos[1]] = 1
        }else{
            canvasArr[pos[0]][pos[1]] = 0
        }

        var cell = e.target
        cell.classList.toggle('on')
    }
}
var canvas = document.getElementById('canvas')
function initialize(){
    for(i = 0; i < height; i++){
        canvasArr.push([])
        var row = document.createElement('tr');
        for(j = 0; j < width; j++){
            canvasArr[i].push(0)
            var cell = document.createElement('td')
            cell.id = `r${i}c${j}`
            cell.addEventListener('click', handleCellClick)
            row.appendChild(cell)
        }
        canvas.appendChild(row)
    }
}
initialize()