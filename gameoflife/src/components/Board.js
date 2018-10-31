import React from "react";
import "./Board.css";
import Cell from "./Cell";

let cell_size = 30;
let board_width = 720;
let board_height = 720;
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
      isPlaying: false,
      count: 0
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
  handleIntervalChange = event => {
    this.setState({ interval: event.target.value });
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
  countIterations = event => {
    let count = this.state.count;
  };

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
  handleReset = event => {
    event.preventDefault();
    console.log("handle reset called");
    this.board = this.generateBoard();
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
        <div className="dropdown">
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
            <a className="dropdown-item" href="#">
              Block
            </a>
            <a className="dropdown-item" href="#">
              Beehive
            </a>
            <a className="dropdown-item" href="#">
              Loaf
            </a>
            <a className="dropdown-item" href="#">
              Boat
            </a>
            <a className="dropdown-item" href="#">
              Tub
            </a>
          </div>
        </div>
        <form>
          <input placeholder="Change grid size to" onChange={this.handleChange} />
          <button onClick={this.handleResize}>Change</button>
        </form>
        <button onClick={this.clickIteration}>Click Iteration</button>
        <p>Iterations: {count}</p>
        <div className="controls">
          Interval Speed <input value={this.state.interval} onChange={this.handleIntervalChange} />{" "}
          {this.state.isPlaying ? (
            <button className="button" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              Run
            </button>
          )}
        </div>
        <button onClick={this.toggleClickable}>
          Toggle clickable: {this.state.isClickable ? <span>Yes</span> : <span>No</span>}
        </button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default Board;
