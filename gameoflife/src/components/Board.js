import React from "react";
import "./Board.css";

const cell_size = 20;
const board_width = 900;
const board_height = 900;

class Board extends React.Component {
  constructor() {
    super();
    this.rows = board_height / cell_size; // This lets us manipulate each cell on the board.
    this.columns = board_width / cell_size;
    this.board = this.generateBoard(); // Create a board out of the rows and column sizes
    this.state = {
      cells: []
    };
  }
  handleClick = event => {
    event.preventDefault();
  };

  generateBoard = () => {
    let cellGrid = [];
    for (let x = 0; x < this.columns; x++) {
      cellGrid[x] = []; // This will create an array of all of x axis of the board.
      for (let y = 0; y < this.rows; y++) {
        cellGrid[x][y] = false; // This will add to the cellGrid array, creating in each array, an array of y's.
      }
    }
    return cellGrid;
  };

  render() {
    console.log("this.board is: ", this.board);
    console.log("this.state.cells is: ", this.state.cells);
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
        />
      </div>
    );
  }
}

export default Board;
