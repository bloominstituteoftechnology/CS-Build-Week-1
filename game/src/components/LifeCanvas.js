import React from "react";
import Life from "./Life";

class LifeCanvas extends React.Component {
  state = {
    boardWidth: 400,
    boardHeight: 400,
    size: 20,
    grid: [],
    colors: [],
    running: false
  };

  componentDidMount() {
    let initColors = [];
    const width = this.state.boardWidth;
    const height = this.state.boardHeight;
    const size = this.state.size;
    const rows = height / this.state.size;
    const cols = width / this.state.size;

    for (let row = 0; row < rows; row++) {
      initColors[row] = [];
      for (let col = 0; col < cols; col++) {
        initColors[row][col] = "white";
      }
    }
    initColors[0][1] = "black";
    initColors[1][2] = "black";
    initColors[2][0] = "black";
    initColors[2][1] = "black";
    initColors[2][2] = "black";

    this.draw(initColors, rows, cols, size);
    this.setState({ colors: initColors });
  }

  draw(colors, rows, cols, size) {
    const board = [];
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    for (let row = 0; row < rows; row++) {
      board[row] = [];
      for (let col = 0; col < cols; col++) {
        const life = new Life(colors[row][col], true, ctx, row, col, size);
        life.draw();
        board[row][col] = life;
      }
    }
    this.setState({ grid: board });
  }

  handleClick = e => {
    if (!this.state.running) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const col = Math.floor((x - rect.left) / this.state.size);
      const row = Math.floor((y - rect.top) / this.state.size);
      const colors = this.state.colors;
      if (colors[row][col] === "black") {
        colors[row][col] = "white";
      } else if (colors[row][col] === "white") {
        colors[row][col] = "black";
      }
      ctx.fillStyle = colors[row][col];
      console.log(col * this.state.size, row * this.state.size);
      ctx.fillRect(
        col * this.state.size + 1,
        row * this.state.size + 1,
        this.state.size - 2,
        this.state.size - 2
      );
      this.setState({ colors });
    }
  };

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.state.boardWidth}
        height={this.state.boardHeight}
        onClick={this.handleClick}
      />
    );
  }
}

export default LifeCanvas;
