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
    const width = this.props.width;
    const height = this.props.height;
    let cells = this.life.getCells();

    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    // imageData is a 'packed' RGBA 1D array
    // [r1, g1, b1, a1, r2, g2, b2, a2,....]
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const status = cells[y][x]; // integer 0, 1
        let color = cells[y][x] ? 0xff : 0x00;
        // Actually update the colors
        imageData.data[index + 0] = color; // red
        imageData.data[index + 1] = color; // green
        imageData.data[index + 2] = color; // blue
        imageData.data[index + 3] = 0xff; // alpha, 0xff = opaque (255)
      }
    }

    // put the image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Next generation of life
    this.life.step();

    requestAnimationFrame(() => { this.animFrame() });   
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
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
