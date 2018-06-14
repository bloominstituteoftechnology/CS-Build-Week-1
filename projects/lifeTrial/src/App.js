import React, { Component } from 'react';
import Life from './life';
import './App.css';

// CONWAYS TRANSFER
const canvasWidth = 400;
const canvasHeight = 300;
let clicked = true;

const COLORS = [
  [0, 0, 0],
  [0xff, 0xff, 0],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
];

/**
 * Life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    // Original
    // this.life = new Life(props.width, props.height);
    // this.life.randomize();

    // CCA import
    this.life = new Life(canvasWidth, canvasHeight);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {
      this.animFrame();
    });
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
    if (clicked) {
      let canvas = this.refs.canvas;
      let ctx = canvas.getContext('2d');

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cells = this.life.getCells();

      // Here is the screen buffer array we can manipulate
      let screenBuffer = imageData.data;

      for (let height = 0; height < canvasHeight; height++) {
        for (let width = 0; width < canvasWidth; width++) {
          // convert xy to index
          let index = (height * canvasWidth + width) * 4;

          let ccaStatus = cells[height][width];

          // change pixels at index to match ccaStatus
          screenBuffer[index + 0] = COLORS[ccaStatus][0];
          screenBuffer[index + 1] = COLORS[ccaStatus][1];
          screenBuffer[index + 2] = COLORS[ccaStatus][2];
          screenBuffer[index + 3] = 255;
        }
      }

      // console.log('screenBuffer in animFrand: ', screenBuffer);

      ctx.putImageData(imageData, 0, 0);


      // Stepping the simulation forward
      this.life.step();
    }
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        <button onClick={() => { clicked = clicked ? false : true }}>Start/Stop</button>
      </div>
    );
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
        <LifeCanvas width={400} height={300} />
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
        <LifeApp />
      </div>
    );
  }
}

export default App;
