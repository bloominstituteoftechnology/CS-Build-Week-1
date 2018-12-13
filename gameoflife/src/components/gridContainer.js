import React, { Component } from "react";
import {
  fourRules
} from "../algorithms/gameFunctions";

class GridContainer extends Component {
  constructor() {
    super();
    this.state = {
      width: 15,
      height: 15,
      grid: [...Array(15)].map(rows => Array(15).fill(0)),
      running: false,

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
    // const w = this.state.width * this.state.height;
    // const h = this.state.width * this.state.height;
    // ctx.canvas.width = w;
    // ctx.canvas.height = h;

    this.drawingGrid();
    // alivecheck
  }

  getMousePos = (canvas, event) => {
    event.preventDefault();
    let rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  // function for determining live or dead
  // aliveCheck = () => {
  //   // console.log("Current Grid in State:", this.state.grid);

  //   const canvas = this.refs.canvas;
  //   const ctx = canvas.getContext("2d");
  //   const w = this.state.width;
  //   const h = this.state.height;
  //   for (let y = 0; y < this.state.grid.length; y++) {
  //     for (let x = 0; x < this.state.grid[y].length; x++) {
  //       if (this.state.grid[y][x]) {
  //         // this.getMousePos()
  //         // console.log(`x: ${x} y: ${y}`);
  //         ctx.fillStyle = "black";
  //         ctx.fillRect(x * w, y * h, w, h);
  //       } else {
  //         ctx.clearRect(x * w, y * h, w, h);
  //         ctx.strokeRect(x * w, y * h, w, h);
  //       }
  //     }
  //   }
  // };

  drawingGrid = () => {
    // drawing the grid
   console.log(this.state.grid);
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const w = this.state.width;
    const h = this.state.height;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, w * w, h * h);
    for (let j = 0; j < w * w; j += this.state.height) {
      ctx.moveTo(j, 0);
      ctx.lineTo(j, h * h);
      for (let k = 0; k < h * h; k += this.state.width) {
        // ctx.stroke();
        ctx.moveTo(0, k);
        ctx.lineTo(h * h, k);
        // console.log(j,k);
        if (this.state.grid[j / h][k / w]) {
          // this.getMousePos()
          console.log("fire", k, j*h);
          // ctx.fillStyle = "#000";
          ctx.fillRect(k, j, w, h);
        } 
        // else {
        //   ctx.clearRect(k * w, j * h, w, h);
        //   ctx.strokeRect(k * w, j * h, w, h);
        // }
      }
    }
    ctx.stroke();
  };

  handleClick(event) {
    // event.preventDefault();
    // console.log(event);
    const w = this.state.width;
    const h = 15;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    let pos = this.getMousePos(canvas, event),
      x = Math.floor(pos.x / w),
      y = Math.floor(pos.y / h);
    // console.log(`pos.x:${pos.x} x:${x} || pos.y:${pos.y} y:${y}`);
    if (this.state.grid[y][x] === 0) {
      ctx.fillStyle = "black";
      // console.log("painting black");
      ctx.fillRect(x * w, y * h, w, h);
      this.state.grid[y][x] = 1;
      // this.setState(state => {
      //   {
      //     grid: state.grid[y][x] = 1;
      //   }
      // });
      // console.log(x, y, this.state.grid[y][x], this.state.grid);
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
    // console.log(`y: ${Math.floor(pos.y / 15)} x: ${Math.floor(pos.x / 15)}`);
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

  // runGame = () => {
  //   this.setState({ grid: fourRules(this.state.grid) });
  //   this.draw()
  //   if (this.running) {
  //     setTimeout(() => {
  //       this.runGame();
  //     }, 30);
  //   }
  // };


  // Run function
  runGame = (event) => {
    // checkingNeighbors(this.state.grid, );
    // if(!this.state.running) {
    //   this.setState({running: true})
    // }
    let generation = 0;
    // console.log("old GRid", this.state.grid);
    const newGrid = fourRules(this.state.grid);
    this.setState({grid: newGrid}, () => {
      this.drawingGrid()
      // console.log("newGrid", this.state.grid);
    }
     
    );
    
    // this.drawingGrid();
    if(this.state.running) {
      console.log("we are playing")
      setTimeout( () => {
        this.runGame();

      }, 300);
      
    
    }
  };

  startGame = (event) => {
    this.setState({running: true});
    this.runGame();
  };

  stopGame = (event) => {
    this.setState({running: false});
  };
  
  // stop function

  render() {
    return (
      <div className="game-container">
        <div className="grid-container">
          <canvas
            className="grid"
            ref="canvas"
            onClick={(event => this.handleClick(event))}
            width={this.state.height * this.state.width}
            height={this.state.height * this.state.width}
          />
        </div>
        <div className="buttons-container">
          <div className="button" onClick={this.startGame}>START</div>
          <div className="button" onClick={this.stopGame}>STOP</div>
          <div className="button" onClick={this.handleClear}>
            CLEAR
          </div>
          <div className="button" onClick={this.runGame}>
            NEXT
          </div>
        </div>
      </div>
    );
  }
}

export default GridContainer;
