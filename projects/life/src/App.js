import React, { Component } from 'react';
import Life from './life';
import './App.css';
const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f]
];

/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.rockPaperScissors = () => {
      const rPS = ['rock', 'paper', 'scissors'];
      const choices = [];
      for (let a = 0; a < 3; a++)
        for (let b = 0; b < 3; b++)
          for (let c = 0; c < 3; c++) {
            choices.push(`${rPS[a]},${rPS[b]},${rPS[c]}`);
            console.log(`${rPS[a]},${rPS[b]},${rPS[c]}`);
          }

      return choices[Math.floor(Math.random() * choices.length)];
    };
    this.life = new Life(props.width, props.height);

    this.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.life.randomize();
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const { width, height } = this.props;
    const cells = this.life.getCells();
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);
    //[r1,b1,g1,r2,b2,g2,r3,b3,g3]
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const color = cells[y][x] ? 0xff : 0x00;
        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
        imageData.data[index + 3] = 0xff; //alpha 0xff = opaque
      }
    ctx.putImageData(imageData, 0, 0);

    this.life.step();
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
        <LifeApp />
      </div>
    );
  }
}

export default App;
