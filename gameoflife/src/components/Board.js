import React from "react";
import "./Board.css";
import Cell from "./Cell";

let cell_size = 40;
let board_width = 600;
let board_height = 600;
let rows = board_height / cell_size; // This gives us the number of rows that will be in our board.
let columns = board_width / cell_size;

class Board extends React.Component {
  constructor() {
    super();
    this.board = this.generateBoard(); // Create a board out of the rows and column sizes
    this.state = {
      cells: [],
      gridSize: "",
      isClickable: false,
      alive: false
    };
  }
  getElementOffset() {
    const rect = this.clickedGrids.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop
    };
  }

  handleClick = event => {
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

  render() {
    console.log("board_width is: ", board_width);
    console.log("board_height is: ", board_height);
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
      </div>
    );
  }
}

export default Board;
