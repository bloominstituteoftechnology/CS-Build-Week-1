import React, { Component } from "react";

import Gamecontrols from "./Gamecontrols";

class Gameboard extends Component {
  state = {
    canvasSize: 500,
    squareSize: 120,
    gameState: [],
    playing: true,
    timer: 1,
    timerID: null
  };

  //notes
  //add in randomizer function for resizer

  componentDidMount() {
    const canvas = this.refs.canvas.getContext("2d");
    canvas.fillStyle = "white";
    canvas.fillRect(0, 0, this.state.canvasSize, this.state.canvasSize);
    const startState = new Array(this.state.squareSize)
      .fill(false)
      .map(() =>
        new Array(this.state.squareSize)
          .fill(false)
          .map(() => (Math.floor(Math.random() * 2) === 0 ? true : false))
      );
    this.setState({ gameState: startState }, () => this.kickoff());
  }

  clearBoard = () => {
    const clearState = new Array(this.state.squareSize)
      .fill(false)
      .map(() => new Array(this.state.squareSize).fill(false));
    this.setState({ gameState: clearState }, () => this.drawBoard());
  };

  kickoff = () => {
    this.drawBoard();
    this.toggleGame();
  };

  drawBoard = () => {
    const canvas = this.refs.canvas.getContext("2d");
    const tileSize = this.state.canvasSize / this.state.squareSize;
    for (let i = 0; i < this.state.squareSize; i++) {
      for (let j = 0; j < this.state.squareSize; j++) {
        if (this.state.gameState[j][i]) {
          canvas.fillStyle = "black";
          canvas.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        } else {
          canvas.fillStyle = "white";
          canvas.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  };

  calculateNextLife = () => {
    const neighbors = new Array(8);
    const newState = this.state.gameState.map(arr => arr.slice());
    const squareSize = this.state.squareSize;
    for (let i = 0; i < squareSize; i++) {
      for (let j = 0; j < squareSize; j++) {
        neighbors[0] =
          i + 1 < squareSize && this.state.gameState[j][i + 1] ? 1 : 0;
        neighbors[1] =
          i + 1 < squareSize &&
          j + 1 < squareSize &&
          this.state.gameState[j + 1][i + 1]
            ? 1
            : 0;
        neighbors[2] =
          j + 1 < squareSize && this.state.gameState[j + 1][i] ? 1 : 0;
        neighbors[3] =
          i - 1 > -1 && j + 1 < squareSize && this.state.gameState[j + 1][i - 1]
            ? 1
            : 0;
        neighbors[4] = i - 1 > -1 && this.state.gameState[j][i - 1] ? 1 : 0;
        neighbors[5] =
          i - 1 > -1 && j - 1 > -1 && this.state.gameState[j - 1][i - 1]
            ? 1
            : 0;
        neighbors[6] = j - 1 > -1 && this.state.gameState[j - 1][i] ? 1 : 0;
        neighbors[7] =
          i + 1 < squareSize && j - 1 > -1 && this.state.gameState[j - 1][i + 1]
            ? 1
            : 0;
        const living = neighbors.reduce((total, i) => (total += i));
        if (this.state.gameState[j][i]) {
          if (living < 2 || living > 3) {
            newState[j][i] = false;
          }
        } else {
          if (living === 3) {
            newState[j][i] = true;
          }
        }
      }
    }
    this.setState({ gameState: newState }, () => this.drawBoard());
  };

  toggleGame = () => {
    if (this.state.playing) {
      clearInterval(this.state.timerID);
      this.setState({ playing: false, timerID: null });
    } else {
      const timerID = setInterval(this.calculateNextLife, this.state.timer);
      this.setState({
        playing: true,
        timerID
      });
    }
  };

  handleClick = event => {
    if (!this.state.playing) {
      const canvas = this.refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const tileSize = this.state.canvasSize / this.state.squareSize;
      const x = Math.floor((event.clientX - rect.left) / tileSize);
      const y = Math.floor((event.clientY - rect.top) / tileSize);
      const gameState = this.state.gameState.map(arr => arr.slice());
      gameState[y][x] = !gameState[y][x];
      this.setState({ gameState }, () => this.drawBoard());
    }
  };

  changeBoardSize = (e, val) => {
    this.setState({ squareSize: val }, () => this.clearBoard());
  };

  changeSpeed = (e, val) => {
    this.toggleGame();
    this.setState({ timer: val }, () => this.toggleGame());
  };

  render() {
    const { squareSize, timer, playing } = this.state;
    return (
      <React.Fragment>
        <canvas
          ref="canvas"
          width={this.state.canvasSize}
          height={this.state.canvasSize}
          onClick={this.handleClick}
        />
        <Gamecontrols
          size={squareSize}
          speed={timer}
          changeSize={this.changeBoardSize}
          changeSpeed={this.changeSpeed}
          playing={playing}
          toggleGame={this.toggleGame}
        />
      </React.Fragment>
    );
  }
}

export default Gameboard;
