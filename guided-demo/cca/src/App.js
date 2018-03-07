import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0xaa, 0xd7, 0xffc], // light blue
  [0x7f, 0xcd, 0xff], // light-ish blue
  [0x00, 0xff, 0xff], // cyan
  [0x06, 0x42, 0x73], // dark blue
  [0x12, 0x8f, 0xff], // bright blue
  [0x00, 0x00, 0x8b], // darker bluen
  [0x1c, 0x6b, 0xa0], // ocean blue
  [0x18, 0x74, 0xcd] // yet another shade of blue
];

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
    requestAnimationFrame(() => { this.animFrame() });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const cells = this.cca.getCells();
    const height = this.props.height;
    const width = this.props.width;

    // Get canvas framebuffer, a packed RGBA array
    const canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    // Update the imageData based on the cells
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const color = COLORS[state];
        const index = (y * width + x) * 4;

        imageData.data[index + 0] = color[0]  // red
        imageData.data[index + 1] = color[1]  // green
        imageData.data[index + 2] = color[2]  // blue
        imageData.data[index + 3] = 0x50  // alpha, 0xff === 255 === opaque
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Iterate the game state!
    this.cca.step();

    // Request another animation frame
    requestAnimationFrame(() => { this.animFrame() });
  }

  /**
   * Render
   */
  render() {
    return <canvas id="gameCanvas" ref="canvas" width={this.props.width} height={this.props.height} />
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

      <CCACanvas width={400} height={300} />

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
      <div>
        <div id="gameCanvas">
          <div className="App">
            <CCAApp />
          </div>
        </div>
      </div>
    );
  }
}

export default App;