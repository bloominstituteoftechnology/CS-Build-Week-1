import React, { Component } from "react";

class GridContainer extends Component {
  constructor() {
    super();
    this.state = {
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

  // Dummy Live Cells
  // this.state.grid[0][0] = 1;
  // this.state.grid[5][5] = 1;
  // this.state.grid[10][3] = 1;
  // End Dummy Data

  componentDidMount() {
    // drawing the grid
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const w = 450;
    const h = 450;
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    this.drawingGrid(w, h, ctx);

    this.aliveCheck();
  }

  getMousePos = (canvas, event) => {
    event.preventDefault();
    let rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  // function for determining live or dead
  aliveCheck = () => {
    console.log("Current Grid in State:", this.state.grid);

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const w = 15;
    const h = 15;
    for (let y = 0; y < this.state.grid.length; y++) {
      for (let x = 0; x < this.state.grid[y].length; x++) {
        if (this.state.grid[y][x]) {
          // this.getMousePos()
          // console.log(`x: ${x} y: ${y}`);
          ctx.fillStyle = "black";
          ctx.fillRect(x * w, y * h, w, h);
        } else {
          ctx.clearRect(x * w, y * h, w, h);
        }
      }
    }
    this.drawingGrid(450, 450, ctx);
  };

  drawingGrid = (w, h, ctx) => {
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
  };

  handleClick(event) {
    event.preventDefault();
    const w = 15;
    const h = 15;
    const canvas = this.refs.canvas;
    let pos = this.getMousePos(canvas, event),
      x = Math.floor(pos.x / w),
      y = Math.floor(pos.y / h);
    // console.log(`x: ${x} y  : ${y}`);
  }

  // Run function

  // stop function

  render() {
    return (
      <div className="grid-container">
        <canvas
          className="grid"
          ref="canvas"
          onClick={event => this.handleClick(event)}
        />
        <div className="run-button">RUN</div>
        <div className="stop-button">STOP</div>
      </div>
    );
  }
}

export default GridContainer;

// {this.state.square ? "square toggled" : "square"
