import React, { Component } from "react";

class GridContainer extends Component {
  constructor() {
    super();
    this.state = {
      alive: { isToggleOn: true },
      square: false,
      grid: [...Array(15)].map(e => Array(15).fill(0))
    };
  }
  // This is a visual of the data structure above
  //  [
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // ]

  componentDidMount() {
    const w = 450;
    const h = 450;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    // drawing the grid
    for (let j = 0; j <= w; j += 15) {
      for (let k = 0; k <= h; k += 15) {
        ctx.moveTo(j, 0);
        ctx.lineTo(j, h);
        ctx.stroke();
        ctx.moveTo(0, k);
        ctx.lineTo(w, k);
        ctx.stroke();
      }
    }
    canvas.onmousemove = function(event) {
      let pos = this.getMousePos(this, event),
      x = pos.x,
      y = pos.y;
      ctx.fillRect(j, k, w, h);
    };
    
    // for(y)iterate over each array and see what is alive
    // for(x) iterate over each element
  }
  
  getMousePos = (canvas, event) => {
    event.preventDefault();
    let rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  // function for determining live or dead
  aliveCheck = () => {
    for (let y = 0; y < this.state.grid.length; y++) {
      // console.log(`This is the y value in the array: ${y}`)

      for (let x = 0; x < this.state.grid[y].length; x++) {
        if (this.state.grid[x]) {
          
        }
      }
    }
  };

  handleClick(event) {
    event.preventDefault();
    this.setState({
      square: !this.state.square
    });
  }

  render() {
    return (
      <div className="grid-container">
        <canvas className="grid" ref="canvas" onClick={this.getMousePos}>
          
        </canvas>
        <div className="run-button">RUN</div>
        <div className="stop-button">STOP</div>
      </div>
    );
  }
}

export default GridContainer;

// {this.state.square ? "square toggled" : "square"
