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
    this.isPaused = false;
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
    if (this.isPaused) return;

    const { width, height } = this.props;
    const cells = this.life.getCells();
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const color = (cells[y][x] ? 0xff: 0x00);

        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
        imageData.data[index + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    requestAnimationFrame(() => this.animFrame());
  }

  pause() {
    this.isPaused = true;
  }

  play() {
    this.isPaused = false;
    this.animFrame();
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <div>
          <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        </div>
        <div style={{display: 'grid', gridColumnGap: '25px', gridTemplateColumns: '1fr 1fr 1fr 1fr'}}>
          <button onClick={() => this.play()}>Start</button>
          <button onClick={() => this.pause()}>Stop</button>
          <button onClick={() => this.life.randomize()}>Randomize</button>
          <button onClick={() => this.life.clear()}>Clear</button>
        </div>
      </div>
    )
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
        <LifeCanvas width={1280} height={720} />
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
