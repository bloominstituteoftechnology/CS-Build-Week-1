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
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life

    const { width, height } = this.props;
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const color = cells[y][x] === 1 ? 0xff : 0x00;

        // update image
        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
        imageData.data[index + 3] = 0xff;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    this.life.step();
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
