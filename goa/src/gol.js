import React from "react";
import GameLife from "./life";

class GOL extends React.Component {
  constructor(props) {
    super(props);
    this.boardWidth = 500;
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
    isRunning: false,
    iteration: 0,
    config: "clear"
  };

  componentDidMount() {
    const config = this.state.config;
    this.initGame(config);
  }

  initGame = config => {
    const board = [];
    const ctx = this.refs.canvas.getContext("2d");

    for (let row = 0; row < this.rows; row++) {
      board[row] = [];
      for (let col = 0; col < this.cols; col++) {
        const life = new GameLife("yellow", ctx, row, col, this.size);
        board[row][col] = life;
      }
    }

    if (config === "glider") {

      board[0][1].currentState = "blue";
      board[1][2].currentState = "blue";
      board[2][0].currentState = "blue";
      board[2][1].currentState = "blue";
      board[2][2].currentState = "blue";
    } else if (config === "exploder") {
    
    } else if (config === "random") {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          const rand = Math.random();
          if (rand < 0.3) {
            board[row][col].currentState = "blue";
          }
        }
      }
    }

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        board[row][col].draw();
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
        if (board[x1][y1].currentState === "blue") neighbors++;
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

        let newCellState = "yellow";
        if (cell.currentState === newCellState) {
          if (neighbors === 3) {
            newCellState = "blue";
          }
        } else {
          if (neighbors === 2 || neighbors === 3) {
            newCellState = "blue";
          }
        }

        const life = new GameLife(newCellState, ctx, row, col, this.size);
        nextGen[row][col] = life;
        nextGen[row][col].draw();
      }
    }

    if (!this.state.isRunning) {
      this.setState({
        currentGen: nextGen,
        iteration: this.state.iteration + 1
      });
    } else {
      this.setState(
        { currentGen: nextGen, iteration: this.state.iteration + 1 },
        () => {
          if (this.state.isRunning) {
            this.raf = requestAnimationFrame(this.drawGrid);
          }

        }
      );
    }
  };

  handleClick = e => {
    if (!this.state.isRunning) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const col = Math.floor((x - rect.left) / this.size);
      const row = Math.floor((y - rect.top) / this.size);
      const board = this.state.currentGen;
      if (board[row][col].currentState === "blue") {
        board[row][col].currentState = "yellow";
      } else if (board[row][col].currentState === "yellow") {
        board[row][col].currentState = "blue";
      }
      ctx.fillStyle = board[row][col].currentState;
      ctx.fillRect(col * this.size, row * this.size, this.size, this.size);
      ctx.strokeRect(col * this.size, row * this.size, this.size, this.size);
      this.setState({ currentGen: board });
    }
  };

  handleChange = e => {
    this.setState({ config: e.target.value, iteration: 0 }, () => {
      this.initGame(this.state.config);
    });
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
    this.setState({ isRunning: false, iteration: 0 }, () => {
      this.initGame(this.state.config);
    });
  };

  step = () => {
    if (!this.state.isRunning) {
      this.drawGrid();
    }
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
        <div>
          <h3 style={{ marginTop: "10px" }}>
            Iteration: {this.state.iteration}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "500px",
            margin: "30px auto"
          }}
        >
          <select value={this.state.config} onChange={this.handleChange}>
            <option value="clear">Clear</option>
            <option value="glider">Glider</option>
            <option value="exploder">Exploder</option>
            <option value="ggun">Gospel Glider Gun</option>
            <option value="random">Random</option>
          </select>
          <button onClick={this.step}>Step</button>
          <button onClick={this.runGame}>Start</button>
          <button onClick={this.stopGame}>Stop</button>
          <button onClick={this.resetGame}>Reset</button>
        </div>
        <div
          style={{
            margin: "auto",
            width: "600px"
          }}
        >
          <h2>The Rules</h2>
          <ul style={{ textAlign: "left", listStyleType: "None" }}>
            <h4>For a cell that is alive(blue):</h4>
            <li>Each cell with one or no neighbors dies, as if by solitude.</li>
            <li>
              Each cell with four or more neighbors dies, as if by
              overpopulation.
            </li>
            <li>Each cell with two or three neighbors survives.</li>
          </ul>
          <ul style={{ textAlign: "left", listStyleType: "None" }}>
            <h4>For a cell that is dead(yellow):</h4>
            <li>Each cell with three neighbors becomes populated.</li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default GOL;