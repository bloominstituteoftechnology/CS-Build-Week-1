import React, { Component } from "react";
import Grid from './components/Grid';
import "./App.css";
import Presets from "./components/Presets";
import About from "./components/About";
import Rules from "./components/Rules";

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.size = 10;
    this.width = 150;
    this.height = 150;
    this.cols = this.width / this.size;
    this.rows = this.height / this.size;
    // this.cols = 15;
    // this.rows = 15;

    this.state = {
      gen: 0,
      grid: Array(this.rows).fill(Array(this.cols).fill(0)),
      aliveCells: 0,
      playing: false,
      paused: true
    }
  }

  selectCell = (row, col) => {
    if (this.state.paused) {
      let gridCopy = arrayClone(this.state.grid);
      // let gridCopy = this.state.grid;
      gridCopy[row][col] = +!gridCopy[row][col];
      this.setState({ grid: gridCopy });
    }
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.grid);
    // let gridCopy = this.state.grid;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = 1;
        }
      }
    }

    this.setState({ grid: gridCopy });
  };

  handlePlay = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.runSim, this.speed);
    this.setState({ playing: true, paused: false })
  }

  handlePause = () => {
    clearInterval(this.intervalId);
    this.setState({ playing: false, paused: true });
  }

  handleStep = () => {
    this.runSim();
    clearInterval(this.intervalId);
  }

  handleStop = () => {
    clearInterval(this.intervalId);
    this.setState({ gen: 0, playing: false, paused: true });
  }

  handleReset = () => {
    clearInterval(this.intervalId);
    this.setState({
      gen: 0,
      grid: Array(this.rows).fill(Array(this.cols).fill(0)),
      playing: false,
      paused: true
    });
  }

  handleRandom = (e) => {
    
  }

  countN = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let row = (y + j + this.rows) % this.rows;
        let col = (x + i + this.cols) % this.cols;
        sum += grid[row][col];
      }
    }
    sum -= grid[x][y];

    return sum;
  }

  runSim = () => {
    let grid = this.state.grid;
    let nextGrid = arrayClone(this.state.grid);
    // let nextGrid = this.state.grid;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let state = grid[i][j];
        let count = 0;
        // let neighbors = this.countN(grid, i, j);

        if (i > 0 && grid[i - 1][j]) count++;
		    if ((i > 0 && j > 0) && grid[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) {
          if (grid[i - 1][j + 1]) count++;
        }
		    if (j < this.cols - 1 && grid[i][j + 1]) count++;
        if (j > 0 && grid[i][j - 1]) count++;
        if (i < this.rows - 1 && grid[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) {
          if (grid[i + 1][j - 1]) count++;
        }
		    if (i < this.rows - 1 && j < this.cols - 1) {
          if (grid[i + 1][j + 1]) count++;
        }
        
		    // if (grid[i][j] && (count < 2 || count > 3)) nextGrid[i][j] = 0;
        // if (!grid[i][j] && count === 3) nextGrid[i][j] = 1;

        if (state === 0 && count === 3) {
          nextGrid[i][j] = 1;
        } else if (state === 1 && (count < 2 || count > 3)) {
          nextGrid[i][j] = 0;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
   
    this.setState({
      grid: nextGrid,
      gen: this.state.gen + 1
    });
  }

  componentDidMount() {
    // this.seed();
  }

  render() {
    return (
      <div className="app-container">
        <div className="header-container">
          <h1>Conway's Game of Life</h1>
        </div>
        <div className="grid-container">
          <h3>Generation: {this.state.gen}</h3>
          <Grid
            grid={this.state.grid}
            rows={this.rows}
            cols={this.cols}
            selectCell={this.selectCell}
          />
          <button onClick={this.handlePlay}>Play</button>
          <button onClick={this.handlePause}>Pause</button>
          <button onClick={this.handleStop}>Stop</button>
          <button onClick={this.handleStep}>Step</button>
          <button onClick={this.handleReset}>Reset</button>
          <button onClick={this.handleRandom}>Random</button>
        </div>
        <div className="preset-container">
          <Presets grid={this.state.grid} />
        </div>
        <div className="rules-container">
          <Rules />
        </div>
        <div className="about-container">
          <About />
        </div>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;