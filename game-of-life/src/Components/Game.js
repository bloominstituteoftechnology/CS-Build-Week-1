import React from 'react';
import './Game.css'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {

  render() {
    const { x, y } = this.props;
    return (
      <div 
        className="Cell" 
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }} 
      />
    );
  }
}

class Game extends React.Component {

  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;

    this.board = this.clearBoard();
  }

  state = {
    cells: [],
    isRunning: false,
    interval: 100,
  }

  runGame = () => {
    this.setState({ isRunning: false });
    this.runIteration();
  }

  stopGame = () => {
    this.setState({ isRunning: false });
  }

  runIteration = () => {
    console.log('running iteration');
    const newBoard = this.clearBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[x][y] = true;
          }
        }
      }
    }
    this.board = newBoard;
    this.setState({ cells: this.addCells() })
  }

  calculateNeighbors = (board, x, y) => {
    console.log('calculating neighbors');
    let neighbors = 0;
    const dirs = [[-1, 1], [-1, 0], [-1, 1], [0,1], [1, 1], [1, 0], [1, -1], [0,-1]];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const y1 = y + dir[0];
      const x1 = x + dir[1];
      
      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbors++;
      }
    }
    return neighbors;
  }

  clearBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }

    return board;
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  addCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  handleClick = (event) => {

    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);
    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }

    this.setState({ cells: this.addCells() });
  }


  render() {
    const { cells, isRunning } = this.state;
    return( 
      <div>
        <div 
          className="Board" 
          style={{ 
            width: WIDTH, 
            height: HEIGHT, 
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
          }}
          onClick={this.handleClick}
          ref={(n) => { this.boardRef = n; }}
        >
          {
            cells.map(cell => (
              <Cell 
                x={cell.x}
                y={cell.y}
                key={`${cell.x}, ${cell.y}`} 
              />
            ))
          }
        </div>
        {
          isRunning ?
            <button className="button" onClick={this.stopGame}>Stop</button> : 
            <button className="button" onClick={this.runGame}>Run</button>
        }
      </div>
    );
  }
}

export default Game;