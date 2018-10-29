import React, { Component } from 'react';
// import './Game.css';

//start drawing a grid with 50px squares (starting at 0,0)

window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp(); 
}
function canvasSupport(e) {
  return !!e.getContext;
}

let TotalNodesX = window.innerWidth;
let TotalNodesY = window.innerHeight;

TotalNodesX = Math.round(Math.floor(TotalNodesX / 50))
TotalNodesY = Math.round(Math.floor(TotalNodesY / 50))

// grid nodes are {x: 0, y:0, xz:50, yz:50}

// const gridOdd = [TotalNodesX][TotalNodesY];
const gridOdd = [];

let curX = 0;
let curY = 0;
for (let i = 0; i < TotalNodesX; i++){
   if(i !== 0) curX += 50;
   const newArr = [];

   for(let j = 0; j < TotalNodesY; j++){
      if(j == 0) curY = 0;
      else curY += 50;
      newArr.push({x: curX, y: curY, xz:50, yz:50})
   }

   gridOdd.push(newArr)
}

console.log(gridOdd)

function canvasApp() {
  var myCanvas = document.getElementById('myCanvas');

  if (!canvasSupport(myCanvas)) {
    return;
  }

  var ctx = myCanvas.getContext('2d');


  const Width = 50 * TotalNodesX;
  const Height = 50 * TotalNodesY;

  myCanvas.width = Width;
  myCanvas.height = Height;


  function drawScreen() {

   //init grid square size
    const dx = 50;
    const dy = 50;

   
    var x = 0;
    var y = 0;
    var w = myCanvas.width;
    var h = myCanvas.height;

 

    var xy = 10;

    ctx.lineWidth = 1;

    ctx.moveTo(x, y);
    ctx.lineTo(w, y);

    ctx.stroke();
    // draw horizontal lines
    while (y < h) {
      y = y + dy;
      ctx.moveTo(x, y);
      ctx.lineTo(w, y);

      ctx.stroke();

      // unsure what this is
      // ctx.font = "1px Calibri";
      // ctx.fillText(xy, x, y);
      // xy += 10;
    }

    //draw vertical lines
    y = 0;
    xy = 10;
    ctx.moveTo(x, y);
    ctx.lineTo(x, h);
    ctx.stroke();
    while (x < w) {
      x = x + dx;
      ctx.moveTo(x, y);
      ctx.lineTo(x, h);
      ctx.stroke();


      // ctx.font = "1px Calibri";
      // ctx.fillText(xy,x,10);
      // xy+=10;


      // draw a box (each square is 50px wide and )
      // gridOdd.forEach((verticalArr, i) => {
      //    verticalArr.forEach((node, j) => {
      //       ctx.rect(node.x, node.y, 50,50)
      //    })
      // })
      let node = gridOdd[0][0];
      ctx.rect(node.x, node.y, 50,50)
      // ctx.rect(50, 0, 50, 50);
      // ctx.rect(0, 0, 50, 50);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  }

  drawScreen();
}

// draw a box (each square is 50px wide and )
// ctx.rect(50, 0, 50, 50);
// ctx.fillStyle = "red";
// ctx.fill();



class Game extends Component {
  render() {
    return (
        <canvas id="myCanvas" width="400" height="400" />
    );
  }
}

export default Game;
