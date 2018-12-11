import React, { Component } from "react";

class Gameboard extends Component {
  state = {
    canvasSize: 500,
    squareSize: 15,
    gameState: []
  };

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
    this.setState({ gameState: startState }, () => this.drawBoard());
  }

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

  handleClick = event => {
    const canvas = this.refs.canvas;
    const rect = canvas.getBoundingClientRect();
    const tileSize = this.state.canvasSize / this.state.squareSize;
    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);
    const gameState = this.state.gameState.slice();
    gameState[y][x] = !gameState[y][x];
    this.setState({ gameState }, () => this.drawBoard());
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.state.canvasSize}
        height={this.state.canvasSize}
        onClick={this.handleClick}
      />
    );
  }
}

export default Gameboard;
