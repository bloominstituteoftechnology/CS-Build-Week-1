import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//start drawing a grid with 50px squares (starting at 0,0)

window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp(); //包含整个Canvas应用程序
}
function canvasSupport(e) {
  return !!e.getContext;
}
function canvasApp() {
  var myCanvas = document.getElementById('myCanvas');

  if (!canvasSupport(myCanvas)) {
    return;
  }

  var ctx = myCanvas.getContext('2d');

  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  function drawScreen() {
    // 横线与竖线的是距
    var dx = 50;
    var dy = 50;

    // 初始坐标原点
    var x = 0;
    var y = 0;
    var w = myCanvas.width;
    var h = myCanvas.height;

    // 单个步长所表示的长度

    var xy = 10;

    ctx.lineWidth = 1;

    // draw horizontal lines
    while (y < h) {
      y = y + dy;
      ctx.moveTo(x, y);
      ctx.lineTo(w, y);

      // ctx.stroke();

      // 横坐标的数字  unsure what this is
      // ctx.font = "1px Calibri";
      // ctx.fillText(xy, x, y);
      // xy += 10;
    }

    //draw vertical lines
    y = 0;
    xy = 10;
    while (x < w) {
      x = x + dx;
      ctx.moveTo(x, y);
      ctx.lineTo(x, h);
      ctx.stroke();

      //纵坐标的数字
      // ctx.font = "1px Calibri";
      // ctx.fillText(xy,x,10);
      // xy+=10;
    }
  }

  drawScreen();
}

// draw a box (each square is 50px wide and )
// ctx.rect(50, 0, 50, 50);
// ctx.fillStyle = "red";
// ctx.fill();

class App extends Component {
  render() {
    return (
      <div className="App">
        <canvas id="myCanvas" width="400" height="400" />
      </div>
    );
  }
}

export default App;
