import React, { Component } from 'react';



export default class Canvas extends Component {
  constructor(){
    super();
    this.state={
        x: 0, 
        y: 0
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 1;
    ctx.beginPath();
    for(let x = 0; x < 500; x += 10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
        ctx.stroke();
    }
    
    for(let y = 0; y < 500; y += 10) {
      ctx.moveTo(0, y);
      ctx.lineTo(500, y)
      ctx.stroke();
    }
    
    ctx.closePath();
  }

  componentDidUpdate() {
    let x = this.state.x; 
    let y = this.state.y-100; 
    
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    function getSquare(canvas, x, y) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: 1 + (x - rect.left) - (x - rect.left)%10,
          y: 1 + (y - rect.top) - (y - rect.top)%10
      };
    }

    var mousePos = getSquare(canvas, x, y);

    function fillSquare(ctx, x, y){
      ctx.fillStyle = "blue";
      ctx.fillRect(x,y,8,8);
    }

    function emptySquare(ctx, x, y) {
      ctx.clearRect(x,y,8,8);
      console.log("clearRect x y", x, y)
    }

    let mousePosX = mousePos.x;
    let mousePosY = mousePos.y; 

    function getPixel(imageData, x, y) {
      const w = imageData.width; 
      const h = imageData.height;
      if (x < 0 || x >= w || y < 0 || y >= h) {
          return null;
      }
      const index = (w * y + x) * 4;
      return imageData.data.slice(index, index + 4);
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelRGBA = getPixel(imageData, mousePosX, mousePosY);
    
    if(pixelRGBA[2] === 255) {
      emptySquare(ctx, mousePosX, mousePosY);
    } else {
      fillSquare(ctx, mousePosX, mousePosY);
    }
    console.log("mouse x, y", mousePosX, mousePosY);

    for(let xCheck = 1; xCheck <= 492; xCheck += 10) {
      for(let yCheck = 1; yCheck <= 492; yCheck += 10) {
        let pixelCheck = getPixel(imageData, xCheck ,yCheck);
        console.log("pixelCheck2",pixelCheck[2])
        if(pixelCheck[2] === 255) {
          emptySquare(ctx, xCheck, yCheck);
        } 
      }
    }
  
  }


  mouseDown = (e) => {
    this.setState({x: e.screenX, y: e.screenY});
  }


  render() {
    return(
      <div className="canvas">
        <canvas 
              ref="canvas" 
              width={500}
              height={500}
              onMouseDown={this.mouseDown.bind(this)}
          />
      </div>
    )
  }
}