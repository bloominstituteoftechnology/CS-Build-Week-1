import React, { Component } from "react";
import styled from 'styled-components';
import Life from "./Life";

const CanvasWindow = styled.canvas`
    border: 2px solid black;
`

class LifeCanvas extends Component{
  constructor(props){
    super(props)
    this.state = {
      rows : this.props.rows,
      cols : this.props.cols,
      cellBoundaries : [],
      filledCells: [],
      running : false,
      life : new Life(this.props.rows, this.props.cols),
      canvas : '',
      c : '',
      counter: 0,
      waitTime : 500,
    }
  }

  componentDidMount() {
    let rows = this.props.rows
    let cols = this.props.cols;

    this.drawGraph(rows, cols);
  }

  drawGraph = (rowsIn, colsIn) => {
       
    let rows = rowsIn;
    let cols = colsIn;

    let canvas = this.refs.canvas;
    let c = canvas.getContext("2d");

    // Clear canvas, cellBoundaries, filledCells and life for resetting rows and cols
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();

    let squareWidth = canvas.width / cols;
    let squareHeight = canvas.height / rows;
    
    let boundaries = [];

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            c.rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight)
            c.stroke();
            let coords = {
                top : i * squareHeight,
                height : squareHeight,
                left :j * squareWidth,
                width : squareWidth
            }
            boundaries.push(coords); 
            this.setState({ cellBoundaries : boundaries})
        }
    }

    this.setState({ canvas : canvas, c : c});
    canvas.addEventListener('click', this.handleClick)
    requestAnimationFrame(() => {
        this.playGame();
    })
    
  }

  componentDidUpdate(nextProps){
    if (nextProps.rows !== this.state.rows || nextProps.cols !== this.state.cols) {
        this.setState({ rows: nextProps.rows, cols : nextProps.cols, cellBoundaries : [], filledCells : [], life : new Life(nextProps.rows, nextProps.cols)});
      }
    } 

  updateRowsCols = () => {
    this.drawGraph(this.state.rows, this.state.cols);
  }

  clearCell = (c, cell, index) => {
    c.fillStyle = "white";
    c.fillRect(cell.left, cell.top, cell.width, cell.height);
    c.rect(cell.left, cell.top, cell.width, cell.height)    // Draw rect to retain borders
    c.stroke();
    // let filledCells = this.state.filledCells.filter(num => num !== index);
    // console.log("filledCells in clearCell: ", filledCells);

    // this.setState({ filledCells : filledCells });
  }

  resetFilledCells = () => {
      this.setState({ filledCells : [] });
  }

  fillCell = (c, cell, index) => {
    c.fillStyle = "red";
    c.fillRect(cell.left, cell.top, cell.width, cell.height);
    c.rect(cell.left, cell.top, cell.width, cell.height)    // Draw rect to retain borders
    c.stroke();
    let filledCells = this.state.filledCells;
    filledCells.push(index);
    this.setState({ filledCells : filledCells })
  }


  handleClick = (event) => {
    // Don't allow clicks when running
    if(this.state.running){
        return;
    }
    let canvas = this.state.canvas;
    let c = this.state.c;

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


  playOrStop = () => {

    this.state.life.setCells(this.state.filledCells.sort());
    this.setState({ running: !this.state.running }, () => {
        if (this.state.running) {
          requestAnimationFrame(() => {
            this.playGame();
          });
        }
      })
  }

  // filledCells is a list of indices, use this to get boundaries from cellBoundaries and clear all cells
  clearCells = (e) => {

      // Dont allow if running
      if(this.state.running && e){
          return
      }
      if(!this.state.running && e){

          this.setState({ counter : 0 });
          this.resetFilledCells();
      }

      let c = this.state.c;
      let filledCells = this.state.filledCells;
      filledCells.forEach(cell => this.clearCell(c, this.state.cellBoundaries[cell], cell))
  }

  playGame = () => {

    let c = this.state.c;

    if(!this.state.running){
        return;
    }
    
    this.state.life.update();
    let cellBoundaries = this.state.cellBoundaries;
    let filledCells = this.state.life.getCells().sort();

    if(JSON.stringify(filledCells) !== JSON.stringify(this.state.filledCells)){
        
        this.setState({ counter : this.state.counter + 1 });
        this.clearCells();
        this.resetFilledCells();


        for (let i = 0; i < filledCells.length; i++) {
        
            this.fillCell(c, cellBoundaries[filledCells[i]], filledCells[i]);
        }
    }

    setTimeout(() => {
        requestAnimationFrame(() => {
            this.playGame();
        })
    }, this.state.waitTime);
  }

  // Calls playOrStop to start, waits, then calls it again to only pass one round
  nextRound = () => {
    if(this.state.running){
        return;
    }
    this.playOrStop();
    setTimeout(() => {
        this.playOrStop();
    }, this.state.waitTime - 200);
    
    
  }

  random = () => {

    this.clearCells();

    let range = (this.state.rows * this.state.cols) - 1;
    let numHits = (Math.floor(Math.random() * range) + 1) / 2;  // Divide by two to lower hits
    let hit;
    let hitSet = new Set();                                     // Avoid duplicate values

    for(let i=0; i < numHits; i++){
        hit = Math.floor(Math.random() * range) + 1;
        hitSet.add(hit);
    }

    hitSet.forEach(hit => this.fillCell(this.state.c, this.state.cellBoundaries[hit], hit));

  }

  render() {
    return (
      <div ref="outer">
        <CanvasWindow ref="canvas" width={300} height={300}/>
        <span>Round #: {this.state.counter}</span>
        <button onClick={this.playOrStop}>{this.state.running ? "Pause Game" : "Play Game"}</button>
        <button onClick={this.clearCells}>Clear Game</button>
        <button onClick={this.nextRound}>Next Round</button>
        <button onClick={this.random}>Random Configuration</button>
        <button onClick={this.updateRowsCols}>Update Rows/Cols</button>
      </div>
    );
  }
}

export default LifeCanvas;