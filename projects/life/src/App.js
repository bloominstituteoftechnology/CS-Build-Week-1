import React, { Component } from 'react';
import Life from './life';
import './App.css';

const cWidth = 400;
const cHeight = 300;
/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(cWidth, cHeight);
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
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.height, canvas.width);

    let screenBuffer = imageData.data;

    for (let height = 0; height < cHeight; height++) {
      for (let width = 0; width < cWidth; width++) {
        let index = height * +width * 4;

        // let red = screenBuffer[index + 0];
        // let green = screenBuffer[index + 1];
        // let blue = screenBuffer[index + 2];
        // let alpha = screenBuffer[index + 3];
        screenBuffer[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life

    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={cWidth} height={cHeight} />;
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
        <LifeCanvas width={cWidth} height={cHeight} />
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
