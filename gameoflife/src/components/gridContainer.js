import React, { Component } from "react";
import { fourRules } from "../algorithms/gameFunctions";

class GridContainer extends Component {
  constructor() {
    super();
    this.state = {
      width: 15,
      height: 15,
      grid: [...Array(15)].map(rows => Array(15).fill(0)),
      running: false,
      fillColor:"#000",
      gameTiming: 300,
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
    // this.setState({ grid: newGrid }, () => {
    //   this.drawingGrid();
    //   // console.log("newGrid", this.state.grid);
    // });

    let startingGrid = [...Array(this.state.height)].map(rows =>
      Array(this.state.height).fill(0)
    );
    this.setState({ grid: startingGrid }, () => {
      this.drawingGrid();
    });
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
          // console.log("fire", k, j * h);
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
    const h = this.state.height;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    let pos = this.getMousePos(canvas, event),
      x = Math.floor(pos.x / w),
      y = Math.floor(pos.y / h);
    // console.log(`pos.x:${pos.x} x:${x} || pos.y:${pos.y} y:${y}`);
    if (this.state.grid[y][x] === 0) {
      ctx.fillStyle = this.state.fillColor;
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

  handleClear = event => {
    event.preventDefault();
    const w = this.state.width;
    const h = this.state.height;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < this.state.grid.length; i++) {
      for (let j = 0; j < this.state.grid[i].length; j++) {
        if (this.state.grid[i][j] === 1) {
          // Set back to 0
          this.state.grid[i][j] = 0;
          // Erase lit square from canvas
          ctx.fillStyle = "white";
          ctx.fillRect(j * w, i * h, w, h);
          ctx.strokeRect(j * w, i * h, w, h);
        }
      }
    }
  };

  // Run function
  runGame = event => {
    // checkingNeighbors(this.state.grid, );
    // if(!this.state.running) {
    //   this.setState({running: true})
    // }
    let generation = 0;
    // console.log("old GRid", this.state.grid);
    const newGrid = fourRules(this.state.grid);
    this.setState({ grid: newGrid }, () => {
      this.drawingGrid();
      // console.log("newGrid", this.state.grid);
    });

    // this.drawingGrid();
    if (this.state.running) {
      console.log("we are playing");
      setTimeout(() => {
        this.runGame();
      }, this.state.gameTiming);
    }
  };

  startGame = event => {
    this.setState({ running: true });
    this.runGame();
  };

  stopGame = event => {
    this.setState({ running: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  // putting this function on hold
  customizeGrid = (event) => {
    event.preventDefault();
    // change width and height state to input values
    console.log(`w: ${this.state.width}, h: ${this.state.height}`) //width and height are set
    console.log("customGrid",this.state.grid)
    let customGrid = [...Array(this.state.height)].map(rows =>
      Array(this.state.width).fill(0)
    );
    this.setState({ grid: customGrid });
    this.drawingGrid();
    
    // call the draw function to rerender the grid (last step)
    // this.drawingGrid();
  };
    

// Change fill color functions
  yellowFill = (event) => {
    event.preventDefault();
    this.setState({fillColor: "#E0F708"});
  }
  blueFill = (event) => {
    event.preventDefault();
    this.setState({fillColor: "#0838F7"});
  }
  redFill = (event) => {
    event.preventDefault();
    this.setState({fillColor: "#F70808"});
  }


// change timing function
  changeGameTiming = (event) => {
    event.preventDefault();
    this.setState({gameTiming: this.state.gameTiming});
  }

  render() {
    return (
      <div className="game-container">
        <div className="grid-container">
          <canvas
            className="grid"
            ref="canvas"
            onClick={event => this.handleClick(event)}
            width={this.state.height * this.state.width}
            height={this.state.height * this.state.width}
          />
        </div>
        <div className="buttons-container">
          <div className="button" onClick={this.startGame}>
            START
          </div>
          <div className="button" onClick={this.stopGame}>
            STOP
          </div>
          <div className="button" onClick={this.handleClear}>
            CLEAR
          </div>
          <div className="button" onClick={this.runGame}>
            NEXT
          </div>
        </div>
        <div className="color-change">
          <h2>Change the Color here</h2>
          <div className="button" onClick={this.blueFill}>
            BLUE
          </div>
          <div className="button" onClick={this.redFill}>
            RED
          </div>
          <div className="button" onClick={this.yellowFill}>
            YELLOW
          </div>
        </div>
        <div className="change-timing">
          <h2>Input Run Speed (in millseconds)</h2>
          <input
            className="input-custom"
            type="text"
            placeholder="Game Speed"
            name="gameTiming"
            value={this.state.gameTiming}
            onChange={this.onChange}
          />          
          <div className="button" onClick={this.changeGameTiming}>
            SUBMIT
          </div>
        </div>
        {/* <form className="customize-grid">
          <input
            className="input-custom"
            type="text"
            placeholder="width"
            name="width"
            value={this.state.width}
            onChange={this.onChange}
          />
          <input
            className="input-custom"
            type="text"
            placeholder="height"
            name="height"
            value={this.state.height}
            onChange={this.onChange}
          />
          <div className="button" onClick={this.customizeGrid}>
            CUSTOMIZE
          </div>
        </form> */}
        </div>
    );
  }
}

export default GridContainer;
