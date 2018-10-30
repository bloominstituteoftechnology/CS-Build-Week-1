import React, { Component } from "react";
import styled from 'styled-components';



const CanvasWindow = styled.canvas`
    border: 2px solid black;
`

class LifeCanvas extends Component{
  constructor(props){
    super(props)
    this.state = {
      numRows : this.props.rows,
      numCols : this.props.cols,
      cellBoundaries : [],
      filledCells: [],
      running : false,
    }
  }

  componentDidMount() {

    
    let numRows = this.state.numRows;
    let numCols = this.state.numCols;

    let canvas = this.refs.canvas;

    let squareWidth = canvas.width / numCols;
    let squareHeight = canvas.height / numRows;
    
    let c = canvas.getContext("2d");

    for (let i = 0; i < numRows; ++i) {
        for (let j = 0; j < numCols; ++j) {
            c.rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight)
            c.stroke();
            let coords = {
                top : i * squareHeight,
                height : squareHeight,
                left :j * squareWidth,
                width : squareWidth
            }
            let boundaries = this.state.cellBoundaries;
            boundaries.push(coords); 
            this.setState({ cellBoundaries : boundaries})
        }
    }

    canvas.addEventListener('click', this.handleClick)
    
  }

  clearCell = (c, cell, index) => {
    c.fillStyle = "white";
    c.fillRect(cell.left, cell.top, cell.width, cell.height);
    c.rect(cell.left, cell.top, cell.width, cell.height)    // Draw rect to retain borders
    c.stroke();
    this.setState({ filledCells : this.state.filledCells.filter(num => num !== index)})
  }

  fillCell = (c, cell, index) => {
    c.fillStyle = "red";
    c.fillRect(cell.left, cell.top, cell.width, cell.height);
    c.rect(cell.left, cell.top, cell.width, cell.height)    // Draw rect to retain borders
    c.stroke();
    this.setState({ filledCells : [...this.state.filledCells, index]})
  }


  handleClick = (event) => {
    // Don't allow clicks when running
    if(this.state.running){
        return;
    }
    let canvas = this.refs.canvas;
    let c = canvas.getContext("2d");

    let y = event.clientY - canvas.offsetTop;
    let x = event.clientX - canvas.offsetLeft;

    this.state.cellBoundaries.forEach((cell, index) => {
        if (y > cell.top && y < cell.top + cell.height && x > cell.left && x < cell.left + cell.width) {
            if(this.state.filledCells.includes(index)){
                this.clearCell(c, cell, index);
            }else{
                this.fillCell(c, cell, index);
            }
        }
    })
  }

  playGame = () => {

  }

  // filledCells is a list of indices, use this to get boundaries from cellBoundaries and clear all cells
  clearCells = () => {
      // Dont allow if running
      if(this.state.running){
          return
      }
      let c = this.refs.canvas.getContext("2d");

      this.state.filledCells.forEach(cell => this.clearCell(c, this.state.cellBoundaries[cell], cell))
  }
  render() {
    return (
      <div ref="outer">
        <CanvasWindow ref="canvas" width={300} height={300}/>
        <button>Play Game</button>
        <button onClick={this.clearCells}>Clear Game</button>
      </div>
    );
  }
}

export default LifeCanvas;