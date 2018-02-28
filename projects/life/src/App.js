import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0xff, 0xff, 0xff],
  [0xff, 0x00, 0x00]
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
    requestAnimationFrame(() => { this.animFrame(); });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const cells = this.life.getCells();
    const canvas = this.refs.canvas;
    const height = this.props.height;
    const width = this.props.width;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const status = cells[y][x];
        const color = COLORS[status];
        const index = (y * width + x) * 4;
        imageData.data[index + 0] = color[0];
        imageData.data[index + 1] = color[1];
        imageData.data[index + 2] = color[2];
        imageData.data[index + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    requestAnimationFrame(() => { this.animFrame(); });
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
        <LifeCanvas width={300} height={250} />
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
