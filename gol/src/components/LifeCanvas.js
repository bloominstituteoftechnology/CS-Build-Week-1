import React, { Component } from 'react';

class LifeCanvas extends Component {
  state = {
    height: 750,
    width: 750,
    square: 15,
    matrix: []
  };

  componentDidMount() {
    this.initializeCanvas();
  }

  initializeCanvas = () => {
    let canvas = this.refs.canvas.getContext('2d');
    canvas.fillStyle = 'white';

    const iter = this.state.height / this.state.square;

    canvas.fillRect(0, 0, this.state.height, this.state.width);

    for (let i = 0; i <= this.state.width; i += iter) {
      canvas.moveTo(i, 0);
      canvas.lineTo(i, this.state.height);
      for (let j = 0; j <= this.state.height; j += iter) {
        canvas.moveTo(0, j);
        canvas.lineTo(this.state.width, j);
      }
    }
    canvas.stroke();
    const matrix = new Array(15).fill(0).map(() => new Array(15).fill(0));
    this.setState({ matrix });
  };

  getCursorPosition = e => {
    let canvas = this.refs.canvas;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    // console.log(`X: ${x}, Y: ${y}`);
    let squareSize = this.state.height / this.state.square;
    let currentSquareX = Math.floor(x / squareSize);
    let currentSquareY = Math.floor(y / squareSize);
    // console.log(`X: ${currentSquareX}, Y: ${currentSquareY}`);
    let matrix = this.state.matrix.slice(0);
    matrix[currentSquareY][currentSquareX] ^= 1;
    this.setState({ matrix });
  };

  render() {
    return (
      <canvas
        ref="canvas"
        height={this.state.height}
        width={this.state.width}
        onClick={this.getCursorPosition}
      />
    );
  }
}

export default LifeCanvas;
