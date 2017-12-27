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
    let width = this.props.width;
    let height = this.props.height;

    // Update life and get cells
    let cells = this.life.getCells();

    // Get canvas framebuffer, a packed RGBA array
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    // Convert the cell values into white or black for the canvas
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        // Index needs to be multiplied by 4 because there are 4 array
        // entries per pixel, Red, Green, Blue, and Alpha:
        let index = (y * width + x) * 4;

        let lifeStatus = cells[y][x];
        let color = lifeStatus === 0? 0x00: 0xff;

        // FYI: Alpha channel controls how transparent a pixel is.

        imageData.data[index + 0] = color; // Red channel
        imageData.data[index + 1] = color; // Green channel
        imageData.data[index + 2] = color; // Blue channel
        imageData.data[index + 3] = 0xff;  // Alpha channel, 0xff = opaque
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Next generation of life
    this.life.step();

    // Request another animation frame
    requestAnimationFrame(() => {this.animFrame()});
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
