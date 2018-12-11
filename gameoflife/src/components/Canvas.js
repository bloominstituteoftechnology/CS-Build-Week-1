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
      for(let y = 0; y < 500; y += 10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
        ctx.moveTo(0, y);
        ctx.lineTo(500, y)
        ctx.stroke();
      }
    }
  }

  componentDidUpdate() {
    let x = this.state.x; 
    let y = this.state.y; 

    function getPixel(imageData, x, y) {
      const w = imageData.width; // Conveniently the width is here
      const h = imageData.height;
  
      if (x < 0 || x >= w || y < 0 || y >= h) {
          // Out of bounds
          return null;
      }
  
      // Compute index within the array
      const index = (w * y + x) * 4;
  
      // Return a copy of the R, G, B, and A elements
      return imageData.data.slice(index, index + 4);
    }

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const pixelRGBA = getPixel(imageData, 10, 10);
    
    console.log(pixelRGBA);
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