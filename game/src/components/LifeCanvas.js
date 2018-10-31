import React from "react";
import Life from "./Life";

class LifeCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.boardWidth = 800;
    this.boardHeight = 400;
    this.size = 10;
    this.cols = 80;
    this.rows = 40;
    this.raf = null;
  }

  getRows() {}

  state = {
    currentGen: [],
    nextGen: [],
    isRunning: false
  };

  componentDidMount() {
    this.initGame();
  }

  initGame = () => {
    const board = [];
    const ctx = this.refs.canvas.getContext("2d");

    for (let row = 0; row < this.rows; row++) {
      board[row] = [];
      for (let col = 0; col < this.cols; col++) {
        const cellState =
          (row === 0 && col === 1) ||
          (row === 1 && col === 2) ||
          (row === 2 && col === 0) ||
          (row === 2 && col === 1) ||
          (row === 2 && col === 2)
            ? "black"
            : "white";

        const life = new Life(cellState, true, ctx, row, col, this.size);
        life.draw();
        board[row][col] = life;
      }
    }
    this.setState({ currentGen: board });
  };

  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let x1 = x + dir[0];
      let y1 = y + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.rows &&
        y1 >= 0 &&
        y1 < this.cols &&
        board[x1][y1]
      ) {
        if (board[x1][y1].currentState === "black") neighbors++;
      }
    }
    // console.log(x, y, neighbors);
    return neighbors;
  }

  drawGrid = () => {
    const nextGen = [];
    const current = this.state.currentGen;
    const ctx = this.refs.canvas.getContext("2d");
    for (let row = 0; row < this.rows; row++) {
      nextGen[row] = [];
      for (let col = 0; col < this.cols; col++) {
        const cell = current[row][col];
        const neighbors = this.calculateNeighbors(current, row, col);

        let newCellState = "white";
        if (cell.currentState === newCellState) {
          if (neighbors === 3) {
            newCellState = "black";
          }
        } else {
          if (neighbors === 2 || neighbors === 3) {
            newCellState = "black";
          }
        }

        const life = new Life(newCellState, true, ctx, row, col, this.size);
        nextGen[row][col] = life;
        nextGen[row][col].draw();
      }
    }
    this.setState({ currentGen: nextGen }, () => {
      setTimeout(() => {
        if (this.state.isRunning) {
          this.raf = window.requestAnimationFrame(this.drawGrid);
        }
      }, 100);
    });
  };

  handleClick = e => {
    if (!this.state.running) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const col = Math.floor((x - rect.left) / this.size);
      const row = Math.floor((y - rect.top) / this.size);
      const board = this.state.currentGen;
      if (board[row][col].currentState === "black") {
        board[row][col].currentState = "white";
      } else if (board[row][col].currentState === "white") {
        board[row][col].currentState = "black";
      }
      ctx.fillStyle = board[row][col].currentState;
      ctx.fillRect(col * this.size, row * this.size, this.size, this.size);
      ctx.strokeRect(col * this.size, row * this.size, this.size, this.size);
      this.setState({ currentGen: board });
    }
  };

  runGame = () => {
    if (!this.state.isRunning) {
      this.raf = requestAnimationFrame(this.drawGrid);
    }
    this.setState({ isRunning: true });
  };

  stopGame = () => {
    if (this.state.isRunning) {
      cancelAnimationFrame(this.raf);
    }
    this.setState({ isRunning: false });
  };

  resetGame = () => {
    cancelAnimationFrame(this.raf);
    this.setState({ isRunning: false }, () => {
      this.initGame();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <canvas
            ref="canvas"
            width={this.boardWidth}
            height={this.boardHeight}
            onClick={this.handleClick}
          />
        </div>
        <button onClick={this.runGame}>Start</button>
        <button onClick={this.stopGame}>Stop</button>
        <button onClick={this.resetGame}>Reset</button>
      </React.Fragment>
    );
  }
}

export default LifeCanvas;
