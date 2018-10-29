import React, { Component } from "react";

class LifeCanvas extends Component{
  constructor(props){
    super(props)
    this.state = {
      numRows : this.props.rows,
      numCols : this.props.cols
    }
  }

  componentDidMount(refs) {

    let numRows = this.state.numRows;
    let numCols = this.state.numCols;

    let canvas = this.refs.canvas;

    let squareWidth = canvas.width / numCols;
    let squareHeight = canvas.height / numRows;
    
    console.log("canvas: ", canvas);
    let c = canvas.getContext("2d");

    for (let i = 0; i < numRows; ++i) {
        for (let j = 0; j < numCols / 2; ++j) {
            c.rect(2 * j * squareWidth + (i % 2 ? 0 : squareWidth), i * squareHeight, squareWidth, squareHeight)
            c.stroke();
        }
        
    }

    c.fillStyle = 'rgba(255, 0,0, 0.5)';
    c.fillRect(100, 100, 100, 100);
    c.fillStyle = 'rgba(0, 255, 0, 0.5)';
    c.fillRect(200, 200, 100, 100);
    c.fillStyle = 'rgba(0, 0, 255, 0.5)';
    c.fillRect(300, 300, 100, 100);

    c.beginPath();
    c.moveTo(100,100);
    c.lineTo(400,400);
    c.strokeStyle = "black";
    c.stroke();

  }
  render() {
    return (
      <div ref="outer">
        <canvas ref="canvas" width={1000} height={1000}/>
      </div>
    );
  }
}

export default LifeCanvas;