import React from 'react';
import './Game.css'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Game extends React.Component {
  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.clearBoard();
  }
  state = {
    cells: [],
  }

  clearBoard = () => {
    const board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  addCells = () => {
    const cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[x][y]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;  
  }
 
  render() {
    return( 
      <div>
        <div 
          className="Board" 
          style={{ width: WIDTH, height: HEIGHT, 
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
        >
        </div>
      </div>
    );
  }
}

export default Game;