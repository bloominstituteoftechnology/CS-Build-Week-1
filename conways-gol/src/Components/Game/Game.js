import React, { Component } from 'react';
import './Game.css';

const cellSize = 20;
const width = 800;
const height = 600;

class Cell extends Component {
  render() {
    const { x, y } = this.props;
    return (
      <div className='cell' style={{
        left: `${cellSize * x + 1}px`,
        top: `${cellSize * y + 1}px`,
        width: `${cellSize - 1}px`,
        height: `${cellSize - 1}px`,
      }} />
    )
  }
}

class Game extends Component {
  constructor() {
    super();
    this.rows = height / cellSize;
    this.cols = width / cellSize;
    this.board = this.makeEmptyBoard();
  }

  state = {
    cells: [],
  }

  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  makeCells() {
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

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  handleClick = event => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / cellSize);
    const y = Math.floor(offsetY / cellSize);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }

    this.setState({ cells: this.makeCells() });
  }

  render() {
    const { cells } = this.state;
    return (
      <div>
        <div className='board'
        style={{ width: width, height: height, backgroundSize: `${cellSize}px ${cellSize}px` }}
        onClick={ this.handleClick }
        ref={ (n) => { this.boardRef = n }}>
        {cells.map(cell => (
          <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
        ))}
        </div>
      </div>
    )
  }
}

export default Game;