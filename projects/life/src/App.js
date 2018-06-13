import React, { Component } from 'react';
import Life from './life';
import './App.css';

const canvasWidth = 400;
const canvasHeight = 300;

const COLORS = [
  [0x00, 0x00, 0x00], // Black
  [0xff, 0xff, 0xff], // White
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
    let height = this.props.height;
    let width = this.props.width;
    let buffer = imageData.data;

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let index = (h * width + w) * 4;

        let lifeStatus = cells[h][w];

        buffer[index + 0] = COLORS[lifeStatus][0];
        buffer[index + 1] = COLORS[lifeStatus][1];
        buffer[index + 2] = COLORS[lifeStatus][2];
        buffer[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

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
        <LifeCanvas width={this.props.width} height={this.props.height} />
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
