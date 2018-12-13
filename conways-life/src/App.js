import React, { Component } from "react";

import LifeCanvas from "./components/LifeCanvas";
import "./App.css";
import arrayClone from "./helpers";

class App extends Component {
  constructor(props) {
    super(props);
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
      //isPlaying: false;
    };
  }
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  };

  seedGame = () => {
    //if isPlaying = false; then do the rest of this stuff 
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.playGame, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slowButton = () => {
    this.speed = 1000;
    this.playButton();
  }

  fastButton = () => {
    this.speed = 100;
    this.playButton();
  }

  clearButton = () => {
    clearInterval(this.intervalId);
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        gridCopy[i][j] = false;
      }
    }
    this.setState({
      gridFull: gridCopy,
      generation: 0
    });
  };

  playGame = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        //checking each neighbor
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });
  };

  componentDidMount() {
    this.seedGame();
    this.playButton();
  }

  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <LifeCanvas
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
        <button onClick={this.playButton}>Play</button>
        <button onClick={this.pauseButton}>Pause</button>
        <button onClick={this.clearButton}>Clear</button>
        <button onClick={this.seedGame}>Seed</button>
        <button onClick={this.slowButton}>Slow</button>
        <button onClick={this.fastButton}>Fast</button>
      </div>
    );
  }
}

export default App;
