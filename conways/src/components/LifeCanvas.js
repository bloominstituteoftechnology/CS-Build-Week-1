import React, { Component } from "react";
import styled from 'styled-components';
import Life from "./Life";

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
`

const Col1 = styled.div`
    display: flex;
    flex-flow: column nowrap;
`
const CanvasWindow = styled.canvas`
    border: 2px solid black;
`

const Buttons = styled.div`
    display: flex;
    flex-flow: column nowrap;
`

const Button = styled.button`
    padding: 2%;
    margin: 3%
    border-radius: 5%;
    display: table;
`

const UpdateRowsCols = styled.button`
    position: absolute;
    bottom: 2%;
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
      jumpTo : 0,
    }
  }

  componentDidMount() {
    let rows = this.props.rows
    let cols = this.props.cols;

    this.drawGraph(rows, cols);
  }

  drawGraph = (rowsIn = this.state.rows, colsIn = this.state.cols) => {
       
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
            c.fillStyle = 'rgba(52, 187, 229, 0.1)';
            c.fillRect(j * squareWidth, i * squareHeight, squareWidth, squareHeight);
            c.rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight);
            c.stroke();
            let coords = {
                top : i * squareHeight,
                height : squareHeight,
                left :j * squareWidth,
                width : squareWidth
            }
            boundaries.push(coords); 
            this.setState({ cellBoundaries : boundaries});
        }
    }

    this.setState({ canvas : canvas, c : c});
    canvas.addEventListener('click', this.handleClick)
    requestAnimationFrame(() => {
        this.playGame();
    })
    
  }

  componentWillUpdate(nextProps){
    // If we receive a new number of cols or rows from App
    if (nextProps.rows !== this.state.rows || nextProps.cols !== this.state.cols) {
        this.setState({ rows: nextProps.rows, cols : nextProps.cols, cellBoundaries : [], filledCells : [], life : new Life(nextProps.rows, nextProps.cols)}, this.drawGraph);
    }
  } 




  updateRowsCols = () => {
        this.drawGraph(this.state.rows, this.state.cols);
  }

  clearCell = (c, cell, index, singleCell = false) => {
    c.fillStyle = 'rgba(52, 187, 229, 0.1)';
    c.clearRect(cell.left, cell.top, cell.width, cell.height);
    // c.fillRect(cell.left, cell.top, cell.width, cell.height);
    c.rect(cell.left, cell.top, cell.width, cell.height)    // Draw rect to retain borders
    c.stroke();
    if(singleCell){ // Update state if only removing single cell via click
        let filledCells = this.state.filledCells.filter(cell => cell !== index);
        this.setState({ filledCells : filledCells });
    }

  }

  resetFilledCells = () => {
      this.setState({ filledCells : [] });
  }

  fillCell = (c, cell, index) => {
    c.fillStyle = 'rgba(0,0,0,0.7)';
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
                this.clearCell(c, cell, index, true);
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

  jumpTo = (e) => {
      e.preventDefault();

      let jumpTo = this.state.jumpTo;

      if(jumpTo > this.state.counter){
          for(let i=0; i < jumpTo - 1; i++){
              this.state.life.update()
          }
          this.setState({ counter : this.state.counter + (jumpTo - this.state.counter) });
          this.nextRound();
      }
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name] : [e.target.value] })
  }

  render() {
    return (
      <Container ref="outer">
        <Col1>
            <CanvasWindow ref="canvas" width={300} height={300}/>
            <span>Round #: {this.state.counter}</span>
            <form onSubmit={this.jumpTo}>
                <label>
                    Jump to State
                    <input name={"jumpTo"} type="text" value={this.state.jumpTo} onChange={this.inputHandler}/>  
                </label>
                <button>Submit</button>
            </form>
        </Col1>


        <Buttons>
            <Button onClick={this.playOrStop}>{this.state.running ? "Pause Game" : "Play Game"}</Button>
            <Button onClick={this.clearCells}>Clear Game</Button>
            <Button onClick={this.nextRound}>Next Round</Button>
            <Button onClick={this.random}>Random Configuration</Button>
        </Buttons>

        <UpdateRowsCols onClick={this.updateRowsCols}>Update Rows/Cols</UpdateRowsCols>


      </Container>
    );
  }
}

export default LifeCanvas;