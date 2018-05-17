import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */

const COLORS = [[0, 0, 0], [0xff, 0, 0], [0, 0xff, 0], [0, 0, 0xff]];

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
    let width = this.props.width;
    let height = this.props.height;

    // Request another animation frame
    /////////////////////////////////////////////////
    // Update life and get cells
    let cells = this.life.getCells();
    // Get canvas framebuffer, a packed RGBA array
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);
    // Convert the cell values into white or black for the canvas
    let buffer = imageData.data;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        let index = (row * width + col) * 4;

        let current = cells[row][col];

        buffer[index + 0] = COLORS[current][0];
        buffer[index + 1] = COLORS[current][1];
        buffer[index + 2] = COLORS[current][2];
        buffer[index + 3] = 0xff;
      }
    }
    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    // Next generation of life
    ////////////////////////////////////////////////
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
        <LifeCanvas width={400} height={300} />
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
