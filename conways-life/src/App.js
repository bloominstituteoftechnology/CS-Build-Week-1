import React, { Component } from "react";

import { Button, ButtonGroup } from "reactstrap";
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
      gridFull: Array(this.rows).fill(Array(this.cols).fill(false)),
      isPlaying: false
    };
  }
  selectBox = (row, col) => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[row][col] = !gridCopy[row][col];
      this.setState({
        gridFull: gridCopy
      });
    } else {
      alert("Simulation in progress – cannot select cell!");
    }
  };

  seedGame = () => {
    if (this.state.isPlaying === false) {
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
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  gliderGun = () => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);

      // gridCopy[1][5] = true;
      // gridCopy[1][6] = true;
      // gridCopy[2][5] = true;
      // gridCopy[2][6] = true;
      // gridCopy[11][5] = true;
      // gridCopy[11][6] = true;
      // gridCopy[11][7] = true;
      // gridCopy[12][4] = true;
      // gridCopy[12][8] = true;
      // gridCopy[13][3] = true;
      // gridCopy[13][9] = true;
      // gridCopy[14][3] = true;
      // gridCopy[14][9] = true;
      // gridCopy[15][6] = true;
      // gridCopy[16][4] = true;
      // gridCopy[16][8] = true;
      // gridCopy[17][5] = true;
      // gridCopy[17][6] = true;
      // gridCopy[17][7] = true;
      // gridCopy[18][6] = true;
      // gridCopy[21][3] = true;
      // gridCopy[21][4] = true;
      // gridCopy[21][5] = true;
      // gridCopy[22][3] = true;
      // gridCopy[22][4] = true;
      // gridCopy[22][5] = true;
      // gridCopy[23][2] = true;
      // gridCopy[23][6] = true;
      // gridCopy[25][1] = true;
      // gridCopy[25][2] = true;
      // gridCopy[25][6] = true;
      // gridCopy[25][7] = true;
      // gridCopy[35][3] = true;
      // gridCopy[35][4] = true;
      // gridCopy[36][3] = true;
      // gridCopy[36][4] = true;

      gridCopy[5][1] = true;
      gridCopy[6][1] = true;
      gridCopy[5][2] = true;
      gridCopy[6][2] = true;
      gridCopy[5][11] = true;
      gridCopy[6][11] = true;
      gridCopy[7][11] = true;
      gridCopy[4][12] = true;
      gridCopy[8][12] = true;
      gridCopy[3][13] = true;
      gridCopy[9][13] = true;
      gridCopy[3][14] = true;
      gridCopy[9][14] = true;
      gridCopy[6][15] = true;
      gridCopy[4][16] = true;
      gridCopy[8][16] = true;
      gridCopy[5][17] = true;
      gridCopy[6][17] = true;
      gridCopy[7][17] = true;
      gridCopy[6][18] = true;
      gridCopy[3][21] = true;
      gridCopy[4][21] = true;
      gridCopy[5][21] = true;
      gridCopy[3][22] = true;
      gridCopy[4][22] = true;
      gridCopy[5][22] = true;
      gridCopy[2][23] = true;
      gridCopy[6][23] = true;
      gridCopy[1][25] = true;
      gridCopy[2][25] = true;
      gridCopy[6][25] = true;
      gridCopy[7][25] = true;
      gridCopy[3][35] = true;
      gridCopy[4][35] = true;
      gridCopy[3][36] = true;
      gridCopy[4][36] = true;
      this.setState({
        gridFull: gridCopy
      });
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.playGame, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
    this.setState({
      isPlaying: false
    });
  };

  slowButton = () => {
    this.speed = 1000;
    this.playButton();
  };

  fastButton = () => {
    this.speed = 100;
    this.playButton();
  };

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
      generation: 0,
      isPlaying: false
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
      isPlaying: true,
      generation: this.state.generation + 1
    });
  };

  componentDidMount() {
    this.seedGame();
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
        <ButtonGroup>
          <Button onClick={this.playButton}>Play</Button>
          <Button onClick={this.pauseButton}>Pause</Button>
          <Button onClick={this.clearButton}>Clear</Button>
          <Button onClick={this.seedGame}>Seed</Button>
          <Button onClick={this.gliderGun}>Glider Gun</Button>
          <Button onClick={this.slowButton}>Slow</Button>
          <Button onClick={this.fastButton}>Fast</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default App;
