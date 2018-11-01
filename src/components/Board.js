import React, { Component } from 'react';
import Cell from './Cell';
import presets from '../preset';
import '../styles/Board.css';

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
    for (let i=0; i<900; i++) {cells.push(0)}
    switch(this.props.template) {
      case 'glider': for (let i=0; i<presets.glider.length; i++) {cells[presets.glider[i]] = 1;} break;
      case 'small_exploder': for (let i=0; i<presets.small_exploder.length; i++) {cells[presets.small_exploder[i]] = 1;} break;
      case 'exploder': for (let i=0; i<presets.exploder.length; i++) {cells[presets.exploder[i]] = 1;} break;
      case 'spaceship': for (let i=0; i<presets.spaceship.length; i++) {cells[presets.spaceship[i]] = 1;} break;
      case 'random': for (let i=0; i<presets.random.length; i++) {cells[presets.random[i]] = 1;} break;
      default: break;
    }
    this.setState({ cells });
  }
  // Calculates neighbors and returns next state
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
      // Returns cells next state
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
    // this.props.handleGen();
  }
  // Used to check if a cell is alive
  isAlive = (row, col) => {
    const length = Math.sqrt(this.state.cells.length);

    if (row === -1) row = length - 1
    if (row === length) row = 0
    if (col === -1) col = length -1
    if (col === length) col = 0

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
    // Checks if clear has been clicked
    if (this.props.clear === true && previousProps !== this.props) {
      this.setupBoard()
      this.props.handleClear()
    }
    if (this.props.template !== '' && previousProps !== this.props) {
      this.setupBoard();
      this.props.handleStopTem();
    }
    // Starts/stops the game from running(Invokes updateCells)
    let celInt = 0;
    if (this.props.running === true) {celInt = setTimeout(this.updateCells, this.props.speed) }
    if (this.props.running === false) {clearTimeout(celInt)}
  }
  // Creates cell components for render
  createCells = () => {
    return this.state.cells.map((cell, index) => (
        <Cell key={index} id={index} value={cell} handleClick={this.handleClick} />
    )) 
  }

  render() { 
    return (
      <div className='board'> {this.createCells()} </div>
    );
  }
}
 
export default Board;