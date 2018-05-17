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
    const framerate = 15;
    const width = this.props.width;
    const height = this.props.height;

    const cells = this.life.getCells();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const lifeStatus = cells[y][x];
        const color = lifeStatus === 0 ? 0x00 : 0xff;

        imageData.data[index + 0] = color; // Red
        imageData.data[index + 1] = color; // Green 
        imageData.data[index + 2] = color; // Blue 
        imageData.data[index + 3] = 0xff;  // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    setTimeout(() => {
      requestAnimationFrame(() => {this.animFrame()});
    }, 1000 / framerate);
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
