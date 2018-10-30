import React, { Component } from 'react';
import { Button} from 'reactstrap';
import styled from 'styled-components';

const GameBtns = styled(Button)`
  margin-right:10px;
`

let prevTimestamp = null;

class LifeCanvas extends Component {
  constructor(props){
    super(props);
    this.continueAnimation = true;
    this.nextSquare = 0;
  }
  
  componentDidMount(){
    this.initializeCanvas();
    // requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
  }

  componentWillUnmount() {
    // Stop animating
    this.continueAnimation = false;
  }

  initializeCanvas = ()=>{
    this.nextSquare = 0;

    let canvas = this.refs.canvas; 
    const ctx = canvas.getContext('2d');
    
    //Fill the ctx with a black box:
    let gridHeight = this.props.height;
    let gridWidth = this.props.width;
    ctx.fillRect(0,0,gridHeight,gridWidth);
    
    //Fill a single Rect:
    let sqEdgeLength = this.props.cellSize;

    //Fill Matrix with Squares:
    for (let i = 0; i<gridHeight/sqEdgeLength; i++){
      for (let j = 0; j<gridHeight/sqEdgeLength; j++){
      ctx.beginPath();
      ctx.rect(i*sqEdgeLength, j*sqEdgeLength, sqEdgeLength, sqEdgeLength);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'grey';
      ctx.stroke();
      }
    }
  }

  onAnimFrame = (timestamp) => {
    let canvas = this.refs.canvas; 
    const ctx = canvas.getContext('2d');

    // Request another animation frame for the future
    if (this.continueAnimation) {
      requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
    }
    // requestAnimationFrame(this.onAnimFrame); //No control on animation


    // If we haven't yet stored the previous time, fake it
    if (prevTimestamp === null) {
        prevTimestamp = timestamp - 30; // milliseconds
    }

    // Compute how long it took between frames
    const elapsed = timestamp - prevTimestamp

    // Remember this for next frame
    prevTimestamp = timestamp;

    console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

    // TODO: Do animation stuff to the canvas
    ctx.beginPath();
    ctx.rect(this.nextSquare++ * this.props.cellSize, 7*this.props.cellSize, this.props.cellSize, this.props.cellSize);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'grey';
    ctx.stroke();
  }

  startGame = () => {
    requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
    this.continueAnimation = true;
  }

  stopGame = () => {
    this.continueAnimation = false;
  }

  restartGame = () => {
    this.continueAnimation = false;
    this.initializeCanvas();
  }

  stepGame = () => {
    requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
    this.continueAnimation = false;
  }

  
  render() {
    return (
      <div>
        <canvas ref="canvas" id="canvas" width={this.props.width} height={this.props.height} onClick={this.props.clickHandler}/>
        <div>
          <GameBtns onClick={this.startGame}>Start</GameBtns>
          <GameBtns onClick={this.stopGame}>Stop</GameBtns>
          <GameBtns onClick={this.restartGame}>Restart</GameBtns>
          <GameBtns onClick={this.stepGame}>Step</GameBtns>
          <GameBtns onClick={this.pauseGame}>Pause</GameBtns>
        </div>
      </div>
    );
  }
  
}

export default LifeCanvas;