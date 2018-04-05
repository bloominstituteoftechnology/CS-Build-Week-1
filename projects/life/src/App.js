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

    // let ctx = canvas.getContext('2d');
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
    const width = this.props.width;
    const height = this.props.height;

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImagedata(0, 0, width, height);
    let cells = this.cca.getCells();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let index = (y * width + x) * 4;
        let color = cells[y][x] ? 0xff : 0x00;

        imageData.data[index + 0] = color; // Red
        imageData.data[index + 1] = color; // Green
        imageData.data[index + 2] = color; // Blue
        imageData.data[index + 3] = 0xff; // Alpha
      }
    }

    // Put the image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Iterate the CCA
    this.cca.step();

    // Request another animation frame
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
        <LifeCanvas width={1000} height={1000} />
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
