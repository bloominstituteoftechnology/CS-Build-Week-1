import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
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
    requestAnimationFrame(() => { this.animFrame() });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const height = this.props.height;
    const width = this.props.width;
    let cells = this.cca.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    // imageData is a packed RBGA 1D array
    // [r1, g1, b1, a1, r2, g2, b2, a2, ...]
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        const index = (h * width + w) * 4;
        const status = cells[h][w];

        // Actually update the colors
        imageData.data[index + 0] = COLORS[status][0]; // R
        imageData.data[index + 1] = COLORS[status][1]; // G
        imageData.data[index + 2] = COLORS[status][2]; // B
        imageData.data[index + 3] = 0xff; // A will be opaque
      }
    }
    // put the image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // iterate the cca
    this.cca.step();

    //request another animation frame
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
 * CCA holder component
 */
class CCAApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={400} height={300} />
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