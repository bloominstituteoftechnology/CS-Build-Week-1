import React, { Component } from 'react';
import { glider, pulsar, galaxy, pentadecathlon } from './presets';
import { rule1, rule2, rule3, rule4, turing } from './about';

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
    interval: 100,
    isRunning: false,
    generation: 0,
    addGen: 0,
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
    console.log(cells);
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
    console.log(this.board);
    this.setState({ cells: this.makeCells() });
  }

  runGame = () => {
    this.setState({ isRunning: true });
    this.runIteration(false);
  }

  stopGame = () => {
    this.setState({ isRunning: false })
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  runIteration = manual => {
    let generation = this.state.generation;
    let newBoard = this.makeEmptyBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
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
    ++generation;
    this.setState({ cells: this.makeCells(), generation })

    if (!manual) {
      this.timeoutHandler = window.setTimeout(() => {
        this.runIteration();
      }, this.state.interval);
    }
  }

  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbors++
      }
    }
    return neighbors;
  }

  handleIntervalChange = event => {
    this.setState({ interval: event.target.value })
  }

  handleRandom = () => {
    if (this.state.isRunning) {
      this.stopGame();
    }
    let generation = 0;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = (Math.random() >= 0.5);
      }
    }
    this.setState({ cells: this.makeCells(), generation });
  }

  handleClear = () => {
    this.stopGame();
    let generation = 0;
    this.board = this.makeEmptyBoard();
    this.setState({ cells: this.makeCells(), generation });
  }

  handleAddGen = event => {
    this.setState({ addGen: event.target.value });
  }

  addGenerations = (event, n) => {
    event.preventDefault();
    let generation = this.state.generation;
    for (let i = 0; i < n; i++) {
      this.runIteration(true);
      ++generation;
      this.setState({ generation })
    }
  }

  presetBoard = preset => {
    for (let i = 0; i < preset.length; i++) {
      this.board[preset[i].y][preset[i].x] = true;
    }
  }

  handlePreset = config => {
    this.handleClear();
    switch (config) {
      case 'glider':
        this.presetBoard(glider);
        break;
      case 'pulsar':
        this.presetBoard(pulsar);
        break;
      case 'galaxy':
        this.presetBoard(galaxy);
        break;
      case 'pentadecathlon':
        this.presetBoard(pentadecathlon);
        break;
      default:
        break;
    }
    this.setState({ cells: this.makeCells() });
  }

  render() {
    const { cells, generation, addGen, isRunning } = this.state;
    return (
      <div>
        <div className='board-rules'>
          <div className='board'
          style={{ width: width, height: height, backgroundSize: `${cellSize}px ${cellSize}px` }}
          onClick={ this.state.isRunning ? null : this.handleClick }
          ref={ (n) => { this.boardRef = n }}>
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
          ))}
          </div>
          <div className='about-rules'>
            <div className='rules'>
              <h1>Rules</h1>
              <p>{rule1}</p>
              <p>{rule2}</p>
              <p>{rule3}</p>
              <p>{rule4}</p>
            </div>
            <div className='about'>
              <h1>Turing Completeness</h1>
              <p>{turing}</p>
              <a href="http://rendell-attic.org/gol/tm.htm">Check it out: http://rendell-attic.org/gol/tm.htm</a>
            </div>
          </div>
         
        </div>
        <div className='controls'>
          Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
          {isRunning ? (
            <button className='button' onClick={this.stopGame}>Stop</button>
          ) : (
            <button className='button' onClick={this.runGame}>Run</button>
          )}
          <button className='button' onClick={this.handleRandom}>Random</button>
          <button className='button' onClick={() => this.runIteration(true)}>>>></button>
          <button className='button' onClick={this.handleClear}>Clear</button>
          <form>
            Add Generations: <input onChange={this.handleAddGen} />
            <button className='button' onClick={(event) => this.addGenerations(event, addGen)}>Add</button>
          </form>
          <p>Generation: {generation}</p>
          <button className='button' onClick={() => this.handlePreset('glider')}>Glider</button>
          <button className='button' onClick={() => this.handlePreset('pulsar')}>Pulsar</button>
          <button className='button' onClick={() => this.handlePreset('galaxy')}>Galaxy</button>
          <button className='button' onClick={() => this.handlePreset('pentadecathlon')}>Pentadecathlon</button>
        </div>
      </div>
    )
  }
}

export default Game;