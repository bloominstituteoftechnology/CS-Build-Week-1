import React, { Component } from 'react';

class LifeCanvas extends Component {

  componentDidMount(){
    this.initializeCanvas();
  }

  initializeCanvas = ()=>{
    let canvas = this.refs.canvas; 
    const ctx = canvas.getContext('2d');
    
    //Fill the ctx with a black box:
    let gridHeight = this.props.height;
    let gridWidth = this.props.width;
    ctx.fillRect(0,0,gridHeight,gridWidth);
    
    //Fill a single Rect:
    let sqEdgeLength = 50;

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


  render() {
    // return (
    //   <div>
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} onClick={this.props.clickHandler}/>
    //   </div>
    // );
  }
  
}

export default LifeCanvas;