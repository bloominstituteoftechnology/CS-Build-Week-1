import React from "react";
import "./Board.css";
import Cell from "./Cell";

let cell_size = 30;
let board_width = 840;
let board_height = 840;
let rows = board_height / cell_size; // This gives us the number of rows that will be in our board.
let columns = board_width / cell_size;
let count = 0;

class Board extends React.Component {
  constructor() {
    super();
    this.board = this.generateBoard(); // Create a board out of the rows and column sizes
    this.state = {
      cells: [],
      gridSize: "",
      isClickable: false,
      isAlive: false,
      interval: 300,
      isPlaying: false
    };
  }
  getElementOffset() {
    const rect = this.clickedGrids.getBoundingClientRect();
    const doc = document.documentElement;
    console.log("doc is: ", doc);
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop
    };
  }

  handleClick = event => {
    if (this.state.isPlaying === true && this.state.isClickable === false) {
      return;
    }
    const elemOffset = this.getElementOffset();
    console.log("elemOffset is: ", elemOffset);
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / cell_size);
    const y = Math.floor(offsetY / cell_size);
    if (x >= 0 && x <= columns && y >= 0 && y <= rows) {
      this.board[y][x] = !this.board[y][x];
    }
    this.setState({ cells: this.generateCells() });
  };
  handleChange = event => {
    this.setState({ gridSize: event.target.value });
  };
  handleResize = event => {
    event.preventDefault();
    board_width = Number(this.state.gridSize);
    board_height = Number(this.state.gridSize);
    this.setState({});
  };

  generateBoard = () => {
    let cellGrid = [];
    for (let y = 0; y < rows; y++) {
      cellGrid[y] = []; // This will create an array of all of x axis of the board.
      for (let x = 0; x < columns; x++) {
        cellGrid[y][x] = false; // This will add to the cellGrid array, creating in each array, an array of y's.
      }
    }
    return cellGrid;
  };
  generateCells = () => {
    let cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  };

  runGame = () => {
    this.setState({ isPlaying: true });
    this.runIteration();
  };
  stopGame = () => {
    this.setState({ isPlaying: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };
  handleIntervalChange = speed => {
    this.setState({ interval: speed });
  };

  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      let y1 = y + direction[0];
      let x1 = x + direction[1];

      if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  }

  runIteration() {
    let emptyBoard = this.generateBoard();
    let newBoard = this.generateBoard();
    if (this.board.toString() === emptyBoard.toString()) {
      this.stopGame();
      return;
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        // If the board has been generates and exists
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }
    this.board = newBoard;
    this.setState({ cells: this.generateCells() });
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  clickIteration = () => {
    this.setState({ isPlaying: true });
    let emptyBoard = this.generateBoard();
    let newBoard = this.generateBoard();
    if (this.board.toString() === emptyBoard.toString()) {
      this.stopGame();
      return;
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        // If the board has been generates and exists
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }
    this.board = newBoard;
    this.setState({ cells: this.generateCells() });
  };

  toggleClickable = event => {
    event.preventDefault();
    this.setState({ isClickable: !this.state.isClickable });
  };
  handleReset = () => {
    count = 0;
    console.log("handle reset called");
    this.board = this.generateBoard();
    this.setState({ cells: this.generateCells() });
  };
  handlePresets = config => {
    this.handleReset();
    switch (config) {
      case "block":
        this.board[11][11] = !this.board[11][11];
        this.board[11][12] = !this.board[11][12];
        this.board[12][11] = !this.board[12][11];
        this.board[12][12] = !this.board[12][12];
        break;
      case "beehive":
        this.board[12][10] = !this.board[12][10];
        this.board[11][11] = !this.board[11][11];
        this.board[11][12] = !this.board[11][12];
        this.board[12][13] = !this.board[12][13];
        this.board[13][12] = !this.board[13][12];
        this.board[13][11] = !this.board[13][11];
        break;
      case "pentadecathlon":
        this.board[9][11] = !this.board[9][11];
        this.board[10][11] = !this.board[10][11];
        this.board[11][11] = !this.board[11][11];
        this.board[12][11] = !this.board[12][11];
        this.board[13][11] = !this.board[13][11];
        this.board[14][11] = !this.board[14][11];
        this.board[15][11] = !this.board[15][11];
        this.board[16][11] = !this.board[16][11];
        this.board[9][12] = !this.board[9][12];
        this.board[11][12] = !this.board[11][12];
        this.board[12][12] = !this.board[12][12];
        this.board[13][12] = !this.board[13][12];
        this.board[14][12] = !this.board[14][12];
        this.board[16][12] = !this.board[16][12];
        this.board[9][13] = !this.board[9][13];
        this.board[10][13] = !this.board[10][13];
        this.board[11][13] = !this.board[11][13];
        this.board[12][13] = !this.board[12][13];
        this.board[13][13] = !this.board[13][13];
        this.board[14][13] = !this.board[14][13];
        this.board[15][13] = !this.board[15][13];
        this.board[16][13] = !this.board[16][13];
        break;
      case "toad":
        this.board[10][11] = !this.board[10][11];
        this.board[10][12] = !this.board[10][12];
        this.board[10][13] = !this.board[10][13];
        this.board[11][12] = !this.board[11][12];
        this.board[11][11] = !this.board[11][11];
        this.board[11][10] = !this.board[11][10];
        break;
      case "glider":
        this.board[9][10] = !this.board[9][10];
        this.board[10][11] = !this.board[10][11];
        this.board[11][11] = !this.board[11][11];
        this.board[11][10] = !this.board[11][10];
        this.board[11][9] = !this.board[11][9];
        break;
      case "spaceship":
        this.board[9][19] = !this.board[9][19];
        this.board[11][19] = !this.board[11][19];
        this.board[12][18] = !this.board[12][18];
        this.board[12][17] = !this.board[12][17];
        this.board[12][16] = !this.board[12][16];
        this.board[12][15] = !this.board[12][15];
        this.board[11][15] = !this.board[11][15];
        this.board[10][15] = !this.board[10][15];
        this.board[9][16] = !this.board[9][16];
        break;
    }
    this.setState({ cells: this.generateCells() });
  };

  render() {
    if (this.state.isPlaying) {
      count = count + 1;
    }
    return (
      <div>
        <div
          className="Board"
          style={{
            width: board_width,
            height: board_height,
            backgroundSize: `${cell_size}px ${cell_size}px`
          }}
          onClick={this.handleClick}
          ref={grid => {
            this.clickedGrids = grid;
          }}
        >
          {" "}
          {this.state.cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>
        <div className="below-grid">
          <div className="left">
            <div className="presets dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Presets
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={() => this.handlePresets("block")}>
                  Block
                </a>
                <a className="dropdown-item" href="#" onClick={() => this.handlePresets("beehive")}>
                  Beehive
                </a>
                <div class="dropdown-divider" />
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.handlePresets("pentadecathlon")}
                >
                  Pentadecathlon
                </a>
                <a className="dropdown-item" href="#" onClick={() => this.handlePresets("toad")}>
                  Toad
                </a>
                <div class="dropdown-divider" />
                <a className="dropdown-item" href="#" onClick={() => this.handlePresets("glider")}>
                  Glider
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.handlePresets("spaceship")}
                >
                  LW Spaceship
                </a>
              </div>
            </div>
            <div className="start">
              {this.state.isPlaying ? (
                <button type="button" className="btn btn-danger" onClick={this.stopGame}>
                  Stop
                </button>
              ) : (
                <button type="button" className="btn btn-success" onClick={this.runGame}>
                  Run Game
                </button>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary manual-click"
              onClick={this.clickIteration}
            >
              Manual
            </button>
          </div>
          <div className="middle">
            <div className="count-iterations">Iterations: {count}</div>
          </div>
          <div className="right">
            <div class="dropdown dropdown-right">
              <a
                class="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Speed
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  onClick={() => this.handleIntervalChange(2000)}
                  className="dropdown-item"
                  href="#"
                >
                  1
                </a>
                <a
                  onClick={() => this.handleIntervalChange(1000)}
                  className="dropdown-item"
                  href="#"
                >
                  2
                </a>
                <a
                  onClick={() => this.handleIntervalChange(300)}
                  className="dropdown-item"
                  href="#"
                >
                  3 (default)
                </a>
                <a
                  onClick={() => this.handleIntervalChange(100)}
                  className="dropdown-item"
                  href="#"
                >
                  4
                </a>
                <a onClick={() => this.handleIntervalChange(50)} className="dropdown-item" href="#">
                  5
                </a>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-info toggle-click"
              onClick={this.toggleClickable}
            >
              Clickable: {this.state.isClickable ? <span>Yes</span> : <span>No</span>}
            </button>
            <button type="button" className="btn btn-warning reset" onClick={this.handleReset}>
              Reset
            </button>
            {/*<div className="control-interval controls">
            Interval Speed{" "}
            <input value={this.state.interval} onChange={this.handleIntervalChange} />{" "}
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
