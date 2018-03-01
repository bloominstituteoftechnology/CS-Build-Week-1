import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x33, 0xA3, 0xF5],
  [0x28, 0x4A, 0xE3],
  [0, 0x5f, 0x7f],
  [0x9D, 0x56, 0xCF],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
]

/**
 * CCA canvas
 */
class CCACanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.cca = new CCA(props.width, props.height);
    this.cca.randomize();
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
    const cells = this.cca.getCells();
    const height = this.props.height;
    const width = this.props.width;

    // Get canvas framebuffer, a packed RGB array
    const canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    // Update the imageData based on the cells
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const color = COLORS[state];
        const index = (y * width + x) * 4;

        imageData.data[index + 0] = color[0]; // Red
        imageData.data[index + 1] = color[1]; // Blue
        imageData.data[index + 2] = color[2]; // Green
        imageData.data[index + 3] = 0xff; // Alpha, 0xff === 255 === opaque
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Iterate the game state!
    this.cca.step();

    // Request another animation frame
    requestAnimationFrame(() => {
      this.animFrame()
    })
  }

  /**
   * Render
   */
  render() {
    return <canvas id="my-canvas" ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={500} height={500} />
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
        <CCAApp />
      </div>
    );
  }
}

export default App;