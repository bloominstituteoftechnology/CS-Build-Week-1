import React, { Component } from 'react';
import Life from './life';
import './App.css';

const ALIVE = [255, 255, 255]; /* white */
const DEAD = [0, 0, 0]; /* black */
const PROB = 0.5; /* seeded probability of life */

/* canvas width/height */
const WIDTH = 300;
const HEIGHT = 300;

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
    this.life.randomize(PROB);
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
    const w = this.props.width;
    const h = this.props.height;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, w, h);

    for (let row = 0; row < h; row++) {
      for (let col = 0; col < w; col++) {
        const lifeGrid = this.life.getCells();
        const index = (row * w + col) * 4; /* 4 for each pixel  */
        const alive = lifeGrid[row][col];

        imageData.data[index + 0] = alive ? ALIVE[0] : DEAD[0];
        imageData.data[index + 1] = alive ? ALIVE[1] : DEAD[1];
        imageData.data[index + 2] = alive ? ALIVE[2] : DEAD[2];

        imageData.data[index + 3] = 0xff; /* alpha channel solid */
      }
    }

    ctx.putImageData(imageData, 0, 0);

    requestAnimationFrame(_ => this.animFrame());

    this.life.step();

    // Update life and get cells

    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
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
        <LifeCanvas width={WIDTH} height={HEIGHT} />
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
