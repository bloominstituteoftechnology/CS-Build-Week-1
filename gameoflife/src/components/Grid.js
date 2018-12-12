import React from 'react';
import Inputs from './Inputs';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      grid: []
    }
    this.prevTimestamp = null;
    this.startHandler = this.startHandler.bind(this);
    this.onAnimFrame = this.onAnimFrame.bind(this);
    this.getNeighbors = this.getNeighbors.bind(this);
  }

  componentDidMount() {
    let boxes = [];
    for(let i = 0;i < 15**2;i++){
        boxes.push(i%2);
    }
    this.setState({
      grid: boxes
    });

    var canvas = this.refs.canvas;
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      let w = ctx.canvas.width;
      let h = ctx.canvas.height;
      let width = 730/15;
      let height = 550/15;

      for (let x=0;x<=w;x+=width) {
          for (let y=0;y<=h;y+=height) {
              ctx.moveTo(x, 0);
              ctx.lineTo(x, h);
              ctx.stroke();
              ctx.moveTo(0, y);
              ctx.lineTo(w, y);
              ctx.stroke();
          }
      }
    }
  }

  startHandler() {
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying
    }))
    requestAnimationFrame(this.onAnimFrame);
  }


  onAnimFrame(timestamp) {
      console.log('onAnimFrame called');
      // Request another animation frame for the future
      if(this.state.isPlaying) setTimeout(requestAnimationFrame(this.onAnimFrame), 1000);

      // If we haven't yet stored the previous time, fake it
      if (this.prevTimestamp === null) {
          this.prevTimestamp = timestamp - 30; // milliseconds
      }

      // Compute how long it took between frames
      const elapsed = timestamp - this.prevTimestamp

      // Remember this for next frame
      this.prevTimestamp = timestamp;

      console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

      // Calculate the fate of each cell based on getNeighbors
      let newGen = [];
      for (let i = 0;i < this.state.grid.length;i++) {
        let currCell = this.state.grid[i];
        let neighbors = this.getNeighbors(i);
        // if a living cell has less than 2 or more than 3 neighbors it dies
        if(currCell === 1 && (neighbors < 2 || neighbors > 3)) newGen[i] = 0;
        // if a dead cell has exactly 3 neighbors it gains life
        else if(currCell === 0 && neighbors === 3) newGen[i] = 1;
        // otherwise the cell persists
        else newGen[i] = currCell;
      }
  }

  getNeighbors(index) {
    let numNeighbors = 0;
    let neighbors = [-16, -15, -14, -1, 1, 14, 15, 16];
    for(let i = 0; i < neighbors.length;i++){
      if(index+neighbors[i] >= 0 && index+neighbors[i] < this.state.grid.length){
        if(this.state.grid[index+neighbors[i]] === 1) numNeighbors++;
      }
    }

    return numNeighbors;
  }

  render() {
    return (
      <div className='grid'>
        <canvas id="canvas" ref="canvas" width="730" height="550"></canvas>
        <Inputs startHandler={this.startHandler} isPlaying={this.state.isPlaying}/>
      </div>
  )}
}

export default Grid;
