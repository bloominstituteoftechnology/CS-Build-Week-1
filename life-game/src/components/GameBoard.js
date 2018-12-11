import React, { Component } from 'react';

class GameBoard extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          height: 300,
          width: 300,
          cells: 15
      }
  }
  drawCanvas = () => {
      let canvas = this.refs.canvas.getContext('2d');
      canvas.fillStyle = 'white';

       const squares = this.state.height/this.state.cells;

       canvas.fillRect(0,0,this.state.height, this.state.width);

       for (let i = 0; i <= this.state.height; i += squares){
          canvas.moveTo(0,i);
          canvas.lineTo(this.state.width, i);
          for (let i = 0; i <= this.state.width; i += squares){
              canvas.moveTo(i,0);
              canvas.lineTo(i, this.state.height);
          }
      }
      canvas.stroke();
  }
   componentDidMount(){
      this.drawCanvas();
  }

  handleClick = (e) => {
    const can = this.refs.canvas
    const context = can.getContext("2d");
    const pos = this.refs.canvas.getBoundingClientRect()
    const squareSize = 20
    context.fillStyle = "black";
    context.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
  }

  unselectSquare = (e) => {
    const can = this.refs.canvas
    const context = can.getContext("2d");
    const pos = can.getBoundingClientRect()
    const squareSize = 20
    context.fillStyle = "white";
    context.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
}

  render(){
      return(
          <canvas 
              onClick={this.handleClick}
              onDoubleClick={this.unselectSquare}
              ref="canvas"
              height={this.state.height}
              width={this.state.width} 
              /> 
              
 
      );
  }
}
  export default GameBoard;