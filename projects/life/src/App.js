import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0, 0xff, 0],
  [0xff, 0, 0] 
]
const canvasWidth = 400 ;
const canvasHeight = 400;
let running = true;
/**
 * Life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life

    if (running){
      let canvas = this.refs.canvas;
      
      let ctx = canvas.getContext('2d');
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cells = this.life.getCells();

      canvas.addEventListener('click', (event) => {
        cells[event.offsetY][event.offsetX] = 2;
        cells[event.offsetY+1][event.offsetX] = 2;   
        cells[event.offsetY][event.offsetX+1] = 2;
      }, false);
      // Here is the screen buffer array we can manipulate:
      let screenBuffer = imageData.data;
      
      for (let height = 0; height < canvasHeight; height++) {
        for (let width = 0; width < canvasWidth; width++){
          let index = (height * canvasWidth + width) * 4;

          let ccaStatus = cells[height][width];

          //change pixels
          screenBuffer[index + 0] = COLORS[ccaStatus][0];
          screenBuffer[index + 1] = COLORS[ccaStatus][1];
          screenBuffer[index + 2] = COLORS[ccaStatus][2];
          screenBuffer[index + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      this.life.step();
  }
    requestAnimationFrame(() => {
      this.animFrame()
    });

  }

  /**
   * Render
   */
  render() {

    return(
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        <div>
          <button onClick={() => this.life.randomize()}>Randomize</button>
          <button onClick={() => this.life.clear()}>Clear</button>
          <button onClick={() => {running = running ? false : true }}>Start/Stop</button>
        </div>
      </div> 
    )
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={canvasWidth} height={canvasHeight} />
      </div>
    )
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <LifeCanvas width={canvasWidth} height={canvasHeight} />
        {/* <LifeApp /> */}
      </div>
    );
  }
}

export default App;
