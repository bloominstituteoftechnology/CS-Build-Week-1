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
  //  [ This is a visual of the data structure above
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
  for (let y = 0; y < this.grid[y].length; y++) {
    console.log(`This is each array: ${y}`);
    for (let x = 0; x < this.grid[y][x].length; x++) {
      console.log(`This is the x value in the array: ${x}`);
    }
  }

  // for(y)iterate over each array and see what is alive
  // for(x) iterate over each element
}


  handleClick(event) {
    event.preventDefault();
    this.setState({
      square: !this.state.square
    });
  }

  render() {
    return (
      <div className="grid-container">
        <canvas className="grid" ref="canvas" onClick={this.handleClick}>
          {/* {this.state.alive.isToggleOn ? 'ON': 'OFF'} */}
        </canvas>
      </div>
    );
  }
}

export default GridContainer;

// {this.state.square ? "square toggled" : "square"
