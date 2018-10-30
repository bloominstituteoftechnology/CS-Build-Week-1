import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: []
    }
  }

  componentDidMount() {
    this.setupBoard()
  }
  setupBoard = () => {
    var cells = [];
    for (let i=0; i<900; i++) {
      cells.push(0)
    } 
    this.setState({ cells });
  }

  updateCells = () => {
    const cells = this.state.cells.map((cell, index) => {
      let neighbors = 0
      const length = Math.sqrt(this.state.cells.length)
      const row = Math.floor(index/length)
      const col = index-(row*length)
      // Calculate neighbors
      if (this.isAlive(row-1, col)) neighbors +=1
      if (this.isAlive(row-1, col+1)) neighbors +=1
      if (this.isAlive(row-1, col-1)) neighbors +=1
      
      if (this.isAlive(row, col+1)) neighbors +=1
      if (this.isAlive(row, col-1)) neighbors +=1
      
      if (this.isAlive(row+1, col)) neighbors +=1
      if (this.isAlive(row+1, col+1)) neighbors +=1
      if (this.isAlive(row+1, col-1)) neighbors +=1
      // Assign nextState
      if (cell === 1) {
        if(neighbors < 2) return 0
        if(neighbors > 3) return 0
        if(neighbors === 3 || neighbors === 2) return 1
      } else {
        if(neighbors === 3) return 1
      }
      return cell
    })
    this.setState({ cells })
  }
  // Function used to check if a cell is alive
  isAlive = (row, col) => {
    const length = Math.sqrt(this.state.cells.length);
    const cell = (row*length)+col
    return this.state.cells[cell]
  }
  // Changes a cell dead/alive when clicked
  handleClick = (id) => {
    const cells = this.state.cells;
    cells[id] = (cells[id]+1) & 1
    this.setState({ cells })
  }
  componentDidUpdate(previousProps) {
    // This function checks if clear has been clicked
    if (this.props.clear === true && previousProps !== this.state.props) {
      this.setupBoard()
      this.props.handleClear()
    }
    // This function starts/stops the game from running
    let interval = 0;
    if (this.props.running === true) {
      console.log("Running!")
      interval = setTimeout(this.updateCells, 1000);
    }
    if (this.props.running === false) {
      clearTimeout(interval)
    }
  }
  // Function called in render to create cells
  cellElements = () => {
    return this.state.cells.map((cell, index) => (
        <Cell key={index} id={index} value={cell} handleClick={this.handleClick} />
    )) 
  }

  render() { 
    return (
      <div className='board'> {this.cellElements()} </div>
    );
  }
}
 
export default Board;