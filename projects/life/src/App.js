import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0x54, 0xc7, 0xfc], // light blue
  [0xff, 0xcd, 0x00], // yellow
  [0xff, 0x96, 0x00], // light orange
  [0xff, 0x28, 0x51], // bright pink
  [0x00, 0x76, 0xff], // bright blue
  [0x44, 0xdb, 0x5e], // bright green
  [0xff, 0x38, 0x34], // red orange
  [0x8e, 0x8e, 0x93] // grey
]
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
    let { width, height } = this.props;
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const state = cells[row][col];
        const color = COLORS[state];
        const index = (row * width * col) * 4;
      
        imageData.data[index + 0] = color[0]; 
        imageData.data[index + 1] = color[1];
        imageData.data[index + 2] = color[2];
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
        <LifeCanvas width={800} height={600} />
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
