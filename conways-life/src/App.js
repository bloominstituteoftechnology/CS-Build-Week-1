import React, { Component } from "react";
import Grid from './components/Grid';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 15;
    this.cols = 15;

    this.state = {
      generation: 0,
      grid: Array(this.rows).fill(Array(this.cols).fill(false))
    }
  }

  selectCell = (row, col) => {
    let gridCopy = arrayClone(this.state.grid);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({ grid: gridCopy });
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.grid);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }

    this.setState({ grid: gridCopy });
  };

  handlePlay = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.runSim, this.speed);
  }

  handlePause = () => {
    clearInterval(this.intervalId);
  }

  handleStop = () => {
    clearInterval(this.intervalId);
    this.setState({ generation: 0 });
  }

  runSim = () => {
    let g = this.state.grid;
    let g2 = arrayClone(this.state.grid);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) {
          if (g[i - 1][j]) count++;
        }
		    if (i > 0 && j > 0) {
          if (g[i - 1][j - 1]) count++;
        }
		    if (i > 0 && j < this.cols - 1) {
          if (g[i - 1][j + 1]) count++;
        }
		    if (j < this.cols - 1) {
          if (g[i][j + 1]) count++;
        }
		    if (j > 0) {
          if (g[i][j - 1]) count++;
        }
		    if (i < this.rows - 1) {
          if (g[i + 1][j]) count++;
        }
		    if (i < this.rows - 1 && j > 0) {
          if (g[i + 1][j - 1]) count++;
        }
		    if (i < this.rows - 1 && j < this.cols - 1) {
          if (g[i + 1][j + 1]) count++;
        }
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
   
    this.setState({
      grid: g2,
      generation: this.state.generation + 1
    });
  }

  componentDidMount() {
    this.seed();
  }

  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <h3>Generation: {this.state.generation}</h3>
        <div>
          <Grid
            grid={this.state.grid}
            rows={this.rows}
            cols={this.cols}
            selectCell={this.selectCell}
          />
        </div>
        <button onClick={this.handlePlay}>Play</button>
        <button onClick={this.handlePause}>Pause</button>
        <button onClick={this.handleStop}>Stop</button>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;