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
    generation: 0
  }

  refreshGrid() {
    let grid = this.state.grid.slice();
    for (let y = 0; y < 18; y++) {
      grid[y] = [];
      for (let x = 0; x < 33; x++) {
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
    for (let y = 0; y < 18; y++) {
      for (let x = 0; x < 33; x++) {
        if (this.state.grid[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  handleClick = (e) => {
    const elementOffset = this.getElementOffset();
    const x = Math.floor((e.pageX - elementOffset.x) / 20);
    const y = Math.floor((e.pageY - elementOffset.y) / 20);
    this.state.grid[y][x] = !this.state.grid[y][x];
    this.setState({ cells: this.fillCells() });
  }

  startGame = () => {
    this.setState({
		  generation: this.state.generation + 1
		});
  }

  stopGame = () => {
    this.setState({
		  generation: this.state.generation - 1
		});
  }

  randomGame = () => {
    for (let y = 0; y < 18; y++) {
        for (let x = 0; x < 33; x++) {
            this.state.grid[y][x] = (Math.random() < 0.4);
        }
    }
    this.setState({ cells: this.fillCells() });
  }

  clearGame = () => { 
    this.refreshGrid();
    window.location.reload();
  }

  render() {
    return (
      <div>
        <p>Generations: {this.state.generation}</p>
        <div className="Grid"
        onClick={this.handleClick}
        ref={(node) => { this.element = node; }}>
        {this.state.cells.map(cell => (
            <Cell x={cell.x} 
                  y={cell.y}
                  key={`${cell.x},${cell.y}`}/>
          ))}
        </div>
        <button onClick={this.startGame}>Start</button>
        <button onClick={this.stopGame}>Stop</button>
        <button onClick={this.randomGame}>Random</button>
        <button onClick={this.clearGame}>Clear</button>
      </div>
    );
  }
}
export default Grid;