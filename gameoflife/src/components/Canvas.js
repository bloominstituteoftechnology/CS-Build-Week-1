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

    function fillSquare(ctx, x, y){
      ctx.fillStyle = "gray"
      ctx.fillRect(x,y,8,8);
    }

    var mousePos = getSquare(canvas, x, y);
    fillSquare(ctx, mousePos.x, mousePos.y);


    // function getPixel(imageData, x, y) {
    //   const w = imageData.width; // Conveniently the width is here
    //   const h = imageData.height;
  
    //   if (x < 0 || x >= w || y < 0 || y >= h) {
    //       // Out of bounds
    //       return null;
    //   }
  
    //   // Compute index within the array
    //   const index = (w * y + x) * 4;
    //   console.log("index", index);
  
    //   // Return a copy of the R, G, B, and A elements
    //   return imageData.data.slice(index, index + 4);
    // }

    // const canvas = this.refs.canvas;
    // const ctx = canvas.getContext("2d");
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // const pixelRGBA = getPixel(imageData, x, y);
    // ctx.fillRect(x, y, 10, 10);
    
    // console.log(pixelRGBA);
  }


  mouseDown = (e) => {
    this.setState({x: e.screenX, y: e.screenY});
  }


  render() {
    console.log("x y state", this.state.x, this.state.y)
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