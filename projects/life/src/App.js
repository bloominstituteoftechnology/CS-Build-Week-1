import React, { Component } from 'react';
import Life from './life';
import './App.css';

const canvasWidth = 800;
const canvasHeight = 600;

const COLORS = [[0x00, 0x00, 0x00], [0xff, 0xff, 0xff]];

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

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();
    // Here is the screen buffer array we can manipulate:
    // console.log(canvas.width, canvas.height);

    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        let index = (height * canvasWidth + width) * 4;

        let lifeStatus = cells[height][width];

        // change pixels at index to match lifeStatus

        screenBuffer[index + 0] = COLORS[lifeStatus][0];
        screenBuffer[index + 1] = COLORS[lifeStatus][1];
        screenBuffer[index + 2] = COLORS[lifeStatus][2];
        screenBuffer[index + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // ctx.imageSmoothingEnabled = false;
    // ctx.drawImage(canvas, 0, 0, 7 * canvas.width, 7 * canvas.height);

    this.life.step();

    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
      />
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
        <LifeCanvas width={canvasWidth} height={canvasHeight} />
      </div>
    );
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
