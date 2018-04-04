import React, { Component } from 'react';
import Life from './life';
import './App.css';

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
    // Update life and get cells
    // Convert the cell values into white or black for the canvas
    // Next generation of life

    const width = this.props.width;
    const height = this.props.height;
    let cells = this.life.getCells();

    // Get canvas framebuffer, a packed RGBA array
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const index = (y * width + x) * 4;
        const color = cells[y][x] === 0 ? 0x00 : 0xff;

        imageData.data[index + 0] = COLORS[status][0]; // R
        imageData.data[index + 1] = COLORS[status][1]; // G
        imageData.data[index + 2] = COLORS[status][2]; // B
        imageData.data[index + 3] = 0xff; // A will be opaque
      }
    }
    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Request another animation frame
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
