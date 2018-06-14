import React, { Component } from 'react';
import Life from './life';
import './App.css';


const canvasWidth = 600;
const canvasHeight = 500;

const COLORS = [
  [0xf5, 0xf5, 0xdc],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0xb0, 0xe0, 0xe6],
  [0, 0x5f, 0x7f],
  [0x00, 0xff, 0xff],
  [0x7b, 0xa0, 0x5b],
  [0xe3, 0x42, 0x34],
  [0xcc, 0x88, 0x99],
  [0x00, 0xff, 0x7f],
  [0x80, 0x00, 0x00]
]

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

    let canvas = this.refs.canvas;
    
    let ctx = canvas.getContext('2d');

    let imageData= ctx.getImageData(0,0, canvas.width, canvas.height);
    let cells = this.life.getCells();
    // Here is the screen buffer array we can manipulate:
    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        //convert xy to index
        let index = (height * canvasWidth + width) * 4;
        let lifeStatus = cells[height][width];

        //change pixels at index to match ccstatus
        screenBuffer[index + 0] = COLORS[lifeStatus][0];
        screenBuffer[index + 1] = COLORS[lifeStatus][1];
        screenBuffer[index + 2] = COLORS[lifeStatus][2];
        screenBuffer[index + 3] = 255;
      }
  }

  // console.log('screenBuffer in animFrame: ', screenBuffer);
  ctx.putImageData(imageData, 0, 0);

  // Step the simulation forward
  this.life.step();
  requestAnimationFrame(() => this.animFrame());

}
  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />
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
