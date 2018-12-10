import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(){
    super(); 
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);
    
    // Door
    ctx.fillRect(130, 190, 40, 60);
    
    // Roof
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
    
  }
  
  render() {
    return(
      <div>
        <canvas ref="canvas" width={640} height={425} />
      </div>
    )
  }
}