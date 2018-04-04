import React, { Component } from "react";
import CCA from "./cca";
import "./App.css";

const COLORS = [
  [0x54, 0xc7, 0xfc], // light blue
  [0xff, 0xcd, 0x00], // yellow
  [0xff, 0x96, 0x00], // light orange
  [0xff, 0x28, 0x51], // bright pink
  [0x00, 0x76, 0xff], // bright blue
  [0x44, 0xdb, 0x5e], // bright green
  [0xff, 0x38, 0x34], // red orange
  [0x8e, 0x8e, 0x93] // grey
];

// const COLORS = [
//   [0xaa, 0xd7, 0xffc], // light blue
//   [0x7a, 0xc0, 0xff], // yellow
//   [0x00, 0x4a, 0x8c], // light orange
//   [0x00, 0x39, 0x6c], // bright pink
//   [0x12, 0x8f, 0xff], // bright blue
//   [0x03, 0x25, 0x42], // bright green
//   [0xce, 0xe2, 0xf5], // red orange
//   [0x34, 0x61, 0x88] // grey
// ];

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
    requestAnimationFrame(() => {
      this.animFrame();
    });
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
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, width, height);

    // Update the imageData based on the cells
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const color = COLORS[state];
        const index = (y * width + x) * 4;

        imageData.data[index + 0] = color[0]; // red
        imageData.data[index + 1] = color[1]; // green
        imageData.data[index + 2] = color[2]; // blue
        imageData.data[index + 3] = 0xba; // alpha, 0xff === 255 === opaque
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Iterate the game state!
    this.cca.step();

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
 * CCA holder component
 */
class CCAApp extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div>
        <div class="ABC">
          <CCACanvas width={800} height={600} />
        </div>
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
        <CCAApp />
      </div>
    );
  }
}

export default App;