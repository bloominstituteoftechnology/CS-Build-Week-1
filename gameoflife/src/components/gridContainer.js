import React, { Component } from "react";
import {
  checkingNeighbors,
  fourRules
} from "../algorithms/gameFunctions";

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
    const w = 225;
    const h = 225;
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
    // console.log("Current Grid in State:", this.state.grid);

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
          ctx.strokeRect(x * w, y * h, w, h);
        }
      }
    }
    this.drawingGrid(225, 225, ctx);
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
    const ctx = canvas.getContext("2d");
    let pos = this.getMousePos(canvas, event),
      x = Math.floor(pos.x / w),
      y = Math.floor(pos.y / h);
    // console.log(`pos.x:${pos.x} x:${x} || pos.y:${pos.y} y:${y}`);
    if (this.state.grid[y][x] === 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(x * w, y * h, w, h);
      this.setState(state => {
        {
          grid: state.grid[y][x] = 1;
        }
      });
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(x * w, y * h, w, h);
      ctx.strokeRect(x * w, y * h, w, h);
      this.setState(state => {
        {
          grid: state.grid[y][x] = 0;
        }
      });
    }
    // console.log(x, y);
    // console.log(`This is state x and y: ${this.state.grid[y][x]}`);
    // this.aliveCheck();
    console.log(`y: ${Math.floor(pos.y / 15)} x: ${Math.floor(pos.x / 15)}`);
  }

  handleClear = (event) => {
    event.preventDefault();
    const w = 15;
    const h = 15;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    for(let i = 0; i < this.state.grid.length; i++) {
      for( let j = 0; j < this.state.grid[i].length; j++){
          if(this.state.grid[i][j] === 1){
            // Set back to 0
            this.state.grid[i][j] = 0;
            // Erase lit square from canvas
            ctx.fillStyle = "white";
            ctx.fillRect(j * w, i * h, w, h);
            ctx.strokeRect(j * w, i * h, w, h);
          }
      }
  }
  }




  // Run function
  runGame = (event) => {
    // checkingNeighbors(this.state.grid, );
    this.setState({ grid: fourRules(this.state.grid)}, () => {
      this.aliveCheck();
    });
    // this.aliveCheck();

  };

  stopGame = (event) => {
    return;
  }
  
  // stop function

  render() {
    return (
      <div className="game-container">
        <div className="grid-container">
          <canvas
            className="grid"
            ref="canvas"
            onClick={event => this.handleClick(event)}
          />
        </div>
        <div className="buttons-container">
          <div className="button" onClick={this.runGame}>RUN</div>
          <div className="button" onClick={this.stopGame}>STOP</div>
          <div className="button" onClick={this.handleClear}>
            CLEAR
          </div>
        </div>
      </div>
    );
  }
}

export default GridContainer;

// {this.state.square ? "square toggled" : "square"
