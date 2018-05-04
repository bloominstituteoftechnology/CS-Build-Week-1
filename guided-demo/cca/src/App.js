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
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const { width, height } = this.props;
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    let imageData = ctx.getImageData(0, 0, width, height);
    
    // imageData is a packed RGBA 1D array
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let ccaGrid = this.cca.getCells();
            let index = (row * width * col) * 4;
            let color = ccaGrid[row][col];
    
            // update the colors
            imageData.data[index + 0] = COLORS[color][0]; // red
            imageData.data[index + 1] = COLORS[color][1]; // green
            imageData.data[index + 2] = COLORS[color][2]; // blue
            imageData.data[index + 3] = 0xff; // alpha, 0xff === opaque
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(() => this.animFrame());
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
        <CCACanvas width={800} height={600} />
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