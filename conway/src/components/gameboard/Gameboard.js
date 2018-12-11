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
      .fill(0)
      .map(() =>
        new Array(this.state.squareSize)
          .fill(0)
          .map(() => (Math.floor(Math.random() * 2) === 0 ? 1 : 0))
      );
    this.setState({ gameState: startState }, () => this.drawBoard());
  }

  drawBoard = () => {
    const canvas = this.refs.canvas.getContext("2d");
    const tileSize = this.state.canvasSize / this.state.squareSize;
    for (let i = 0; i < this.state.squareSize; i++) {
      for (let j = 0; j < this.state.squareSize; j++) {
        if (this.state.gameState[j][i] === 1) {
          canvas.fillStyle = "black";
          canvas.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        } else {
          canvas.fillStyle = "white";
          canvas.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  };

  handleClick = (canvas, event) => {

  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.state.canvasSize}
        height={this.state.canvasSize}
      />
    );
  }
}

export default Gameboard;
