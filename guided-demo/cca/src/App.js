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
];

const ZOMBIE = {
  y: (Math.random() * this.height) | 0,
  x: (Math.random() * this.width) | 0,
  color: [255, 121, 77] /* red */,
};

const HUMAN = {
  color: [255, 229, 180],
};

const canvasWidth = 1000;
const canvasHeight = 400;

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
    // this.cca.randomize();
    this.cca.zombie_simul(ZOMBIE);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(_ => this.animFrame());
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const width = this.props.width;
    const height = this.props.height;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, width, height);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const CCAGrid = this.cca.getCells();
        const index = (row * width + col) * 4; /* 4 for each pixel  */
        const color = CCAGrid[row][col];

        // imageData.data[index + 0] = COLORS[color][0];
        // imageData.data[index + 1] = COLORS[color][1];
        // imageData.data[index + 2] = COLORS[color][2];
        imageData.data[index + 0] = index === 0 ? ZOMBIE[0] : HUMAN[0];
        imageData.data[index + 1] = index === 0 ? ZOMBIE[1] : HUMAN[1];
        imageData.data[index + 2] = index === 0 ? ZOMBIE[2] : HUMAN[2];

        imageData.data[index + 3] = 0xff; /* alpha channel solid */
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(_ => this.animFrame());

    // this.cca.step();
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
        <CCACanvas width={canvasWidth} height={canvasHeight} />
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
