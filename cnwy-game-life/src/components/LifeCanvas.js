import React, { Component } from 'react';

class LifeCanvas extends Component {

  componentDidMount(){
    this.updateCanvas();
  }

  updateCanvas = ()=>{
    const ctx = this.refs.canvas.getContext('2d');
    
    //Fill the ctx with a black box:
    let gridHeight = 500;
    let gridWidth = 500;
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