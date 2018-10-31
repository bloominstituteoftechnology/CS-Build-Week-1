import React from 'react';
import './App.css';
import Cell from './Cell'

class Grid extends React.Component {
  constructor() {
    super();
  }
  state = {
    cells: [],
    grid: [],
    generation: 0,
    interval: 200,
    isRunning: false,
    rows: 18,
    columns: 33
  }

  refreshGrid() {
    let grid = this.state.grid.slice();
    for (let y = 0; y < this.state.rows; y++) {
      grid[y] = [];
      for (let x = 0; x < this.state.columns; x++) {
        grid[y][x] = undefined;
      }
    }
    this.setState({grid});
  }

  componentDidMount(){
    this.refreshGrid();
  }
  
  getElementOffset() {
    const rect = this.element.getBoundingClientRect();
    return {
      x: (rect.left + window.pageXOffset) - document.documentElement.clientLeft,
      y: (rect.top + window.pageYOffset) - document.documentElement.clientTop,
    };
  }

  fillCells() {
    let cells = [];
    for (let y = 0; y < this.state.rows; y++) {
      for (let x = 0; x < this.state.columns; x++) {
        if (this.state.grid[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  handleClick = (e) => {
    if (!this.state.isRunning) {
    const elementOffset = this.getElementOffset();
    const x = Math.floor((e.pageX - elementOffset.x) / 20);
    const y = Math.floor((e.pageY - elementOffset.y) / 20);
    this.state.grid[y][x] = !this.state.grid[y][x];
    this.setState({ cells: this.fillCells() });
    }
  }

  nextIteration = () => {

    let firstBuffer = this.state.grid; // grid
    let secondBuffer = this.state.grid.slice(0); // grid copy

    for (let x = 0; x < this.state.rows; x++) { // loop thru rows
		  for (let y = 0; y < this.state.columns; y++) { // loop thru columns
		    let neighbours = 0; // initialize neighbours

          if (x > 0) if (firstBuffer[x-1][y]) neighbours++; // left
          if (x > 0 && y < this.columns - 1) if (firstBuffer[x-1][y+1]) neighbours++; // diagonal up and left
          if (y < 33 - 1) if (firstBuffer[x][y+1]) neighbours++; // up
          if (x < 18 - 1 && y < 33 - 1) if (firstBuffer[x+1][y+1]) neighbours++; // diagonal up and right
          if (x < 18 - 1) if (firstBuffer[x+1][y]) neighbours++; // right
          if (x < 18 - 1 && y > 0) if (firstBuffer[x+1][y-1]) neighbours++; // diagonal down and right
          if (y > 0) if (firstBuffer[x][y-1]) neighbours++; // down
          if (x > 0 && y > 0) if (firstBuffer[x-1][y-1]) neighbours++; // diagonal down left

		    if (firstBuffer[x][y] && (neighbours < 2 || neighbours > 3)) secondBuffer[x][y] = false; // if less than 2 neighbours or more than three neighbours, it dies
		    if (!firstBuffer[x][y] && neighbours === 3) secondBuffer[x][y] = true; // if exactly 3 neighbours, it's born
		  }
		}

    this.setState({ 
      cells: this.fillCells(secondBuffer), // fill cells with second buffer
      generation: this.state.generation + 1 }) // increase generations
    }
  

  playGame = () => {
    this.setState({ isRunning: true })
    clearInterval(this.intervalID);
		this.intervalID = setInterval(this.nextIteration, this.state.interval);
  }

  pauseGame = () => {
    this.setState({ isRunning: false })
    clearInterval(this.intervalID);
  }

  randomGame = () => {
    for (let y = 0; y < this.state.rows; y++) {
        for (let x = 0; x < this.state.columns; x++) {
            this.state.grid[y][x] = (Math.random() < 0.33);
        }
    }
    this.setState({ cells: this.fillCells() });
  }

  clearGame = () => { 
    this.refreshGrid();
    window.location.reload();
  }

  fast = () => {
      this.setState({ interval: 100});
  }

  slow = () => {
      this.setState({ interval: 400});
  }

  render() {
    console.log(this.state.interval);
    return (
      <div>
        <p>Generations: {this.state.generation}</p>
        <div className="Grid"
        onClick={this.handleClick}
        ref={(node) => { this.element = node; }}>
        {this.state.cells.map(cell => (
            <Cell x={cell.x} 
                  y={cell.y}
                  key={`${cell.x}_${cell.y}`}/>
          ))}
        </div>
        <button onClick={this.playGame}>Play</button>
        <button onClick={this.pauseGame}>Pause</button>
        <button onClick={this.nextIteration}>Next</button>
        <button onClick={this.fast}>Fast</button>
        <button onClick={this.slow}>Slow</button>
        <button onClick={this.randomGame}>Random</button>
        <button onClick={this.clearGame}>Clear</button>
      </div>
    );
  }
}
export default Grid;