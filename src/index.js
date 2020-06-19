var width = 50;
var height = 50;
var canvasArr = [];

var running = false;

var canvas = document.getElementById('canvas')
for(i = 0; i < height; i++){
    canvasArr.push([])
    var row = document.createElement('tr');
    for(j = 0; j < width; j++){
        canvasArr[i].push(0)
        var cell = document.createElement('td')
        cell.id = `r${i}c${j}`
        row.appendChild(cell)
    }
    canvas.appendChild(row)
}
function randomize(){
    for(i = 0; i < height; i++){
        for(j = 0; j < width; j++){
            canvasArr[i][j] = 0
            item = document.getElementById(`r${i}c${j}`)
            item.classList.remove('on')
            if(Math.random() > .8 ){
                canvasArr[i][j] = 1
                item.classList.add('on')
            }
        }
    }
}
function checkAlive(x,y,arr){
    var count = 0
    if(x > 0 && y > 0 && canvasArr[y-1][x-1] === 1){
        count++
    }
    if(y > 0&& canvasArr[y-1][x] === 1){
        count++
    }
    if(y > 0 && x < width-1 !== null && canvasArr[y-1][x+1] === 1){
        count++
    }
    if(x > 0 && canvasArr[y][x-1] === 1){
        count++
    }
    if(x < width-1 && canvasArr[y][x+1] === 1){
        count++
    }
    if(y< height-1 && x > 0 !== null && canvasArr[y+1][x-1] === 1){
        count++
    }
    if(y < height-1 && arr[y+1][x] === 1){
        count++
    }
    if(y < height-1 && x < width-1 && canvasArr[y+1][x+1] === 1){
        count++
    }
    if(count < 2 || count > 3){
        if(arr[y][x] === 1){
            arr[y][x] = 0
        } 
        return {alive:false, data: arr}
    }else{ 
        if(canvasArr[y][x] == 0 && count == 3){
            arr[y][x] = 1
            return {alive: true, data: arr, counter: count}
        }else if(canvasArr[y][x] == 0 && count !== 3){
            return {alive: false, data: arr, counter: count}
        }else{
            return {alive: true, data: arr, counter: count}
        }
        
    }
    
}
function sim(){
    if(running){
        var newArr = JSON.parse(JSON.stringify(canvasArr))
        for(y = 0; y < height; y++){
            for(x = 0; x < width; x++){
                let item = document.getElementById(`r${y}c${x}`)
                let res = checkAlive(x,y,newArr)
                newArr = res.data
                if(res.alive){
                    item.classList.add('on')
                }else{
                    item.classList.remove('on')  
                }
            }
        }
        canvasArr = newArr
    }
                      
}
 
function togglePlay(){
    let button = document.querySelector('#play')
    running = !running    
    if(running){
        button.innerHTML = 'Pause'
        timer = setInterval(()=>{sim(); console.log('ticking')},150)
    }else{
        clearInterval(timer)
        button.innerHTML = 'Play'
    }
}
function next(){
    running = true
    sim()
    running = !running
}

function clearBoard(){
    for(y = 0; y < height; y++){
        for(x = 0; x < width; x++){
            let item = document.getElementById(`r${y}c${x}`)
            canvasArr[y][x] = 0
            item.classList.remove('on')
        }
    }
}

function beacon(){
    let startx = width/2
    let starty = height/2
    
    canvasArr[starty][startx] = 1
    document.getElementById(`r${starty}c${startx}`).classList.add('on')
    canvasArr[starty+1][startx] = 1
    document.getElementById(`r${starty+1}c${startx}`).classList.add('on')
    canvasArr[starty+1][startx+1] = 1
    document.getElementById(`r${starty+1}c${startx+1}`).classList.add('on')
    canvasArr[starty][startx+1] = 1
    document.getElementById(`r${starty}c${startx+1}`).classList.add('on')

    canvasArr[starty+2][startx+2] = 1
    document.getElementById(`r${starty+2}c${startx+2}`).classList.add('on')
    canvasArr[starty+2][startx+3] = 1
    document.getElementById(`r${starty+2}c${startx+3}`).classList.add('on')
    canvasArr[starty+3][startx+2] = 1
    document.getElementById(`r${starty+3}c${startx+2}`).classList.add('on')
    canvasArr[starty+3][startx+3] = 1
    document.getElementById(`r${starty+3}c${startx+3}`).classList.add('on')
}

function blinker(){
    let startx = width/2
    let starty = height/2
    canvasArr[starty][startx] = 1
    document.getElementById(`r${starty}c${startx}`).classList.add('on')
    canvasArr[starty-1][startx] = 1
    document.getElementById(`r${starty-1}c${startx}`).classList.add('on')
    canvasArr[starty+1][startx] = 1
    document.getElementById(`r${starty+1}c${startx}`).classList.add('on')
}
