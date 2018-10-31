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
        const life = new Life("white", ctx, row, col, this.size);
        board[row][col] = life;
      }
    }

    if (config === "glider") {
      board[0][1].currentState = "black";
      board[1][2].currentState = "black";
      board[2][0].currentState = "black";
      board[2][1].currentState = "black";
      board[2][2].currentState = "black";
    } else if (config === "exploder") {
      board[18][37].currentState = "black";
      board[19][37].currentState = "black";
      board[20][37].currentState = "black";
      board[21][37].currentState = "black";
      board[22][37].currentState = "black";
      board[18][39].currentState = "black";
      board[22][39].currentState = "black";
      board[18][41].currentState = "black";
      board[19][41].currentState = "black";
      board[20][41].currentState = "black";
      board[21][41].currentState = "black";
      board[22][41].currentState = "black";
    } else if (config === "ggun") {
      board[10][20].currentState = "black";
      board[10][21].currentState = "black";
      board[11][20].currentState = "black";
      board[11][21].currentState = "black";

      board[11][28].currentState = "black";
      board[12][28].currentState = "black";
      board[10][29].currentState = "black";
      board[12][29].currentState = "black";
      board[10][30].currentState = "black";
      board[11][30].currentState = "black";

      board[12][36].currentState = "black";
      board[13][36].currentState = "black";
      board[14][36].currentState = "black";
      board[12][37].currentState = "black";
      board[13][38].currentState = "black";

      board[9][42].currentState = "black";
      board[10][42].currentState = "black";
      board[8][43].currentState = "black";
      board[10][43].currentState = "black";
      board[8][44].currentState = "black";
      board[9][44].currentState = "black";

      board[20][44].currentState = "black";
      board[21][44].currentState = "black";
      board[20][45].currentState = "black";
      board[22][45].currentState = "black";
      board[20][46].currentState = "black";

      board[8][54].currentState = "black";
      board[9][54].currentState = "black";
      board[8][55].currentState = "black";
      board[9][55].currentState = "black";

      board[15][55].currentState = "black";
      board[16][55].currentState = "black";
      board[17][55].currentState = "black";
      board[15][56].currentState = "black";
      board[16][57].currentState = "black";
    } else if (config === "random") {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          const rand = Math.random();
          if (rand < 0.3) {
            board[row][col].currentState = "black";
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

        const life = new Life(newCellState, ctx, row, col, this.size);
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
          // setTimeout(() => {

          // }, 0.5);
        }
      );
    }
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

  handleChange = e => {
    this.setState({ config: e.target.value }, () => {
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
            margin: "0 auto 100px"
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
      </React.Fragment>
    );
  }
}

export default LifeCanvas;
