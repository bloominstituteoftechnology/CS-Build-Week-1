import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0x00, 0x11, 0x11],
  [0xff, 0xcc, 0x00]
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

    this.fps = 61;

    this.state = { pause: false, pauseVal: 'stop' };
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
  animFrame(timestamp) {
    if (!this.state.pause) {

      const cells = this.life.getCells();
      const height = this.props.height;
      const width = this.props.width;
      const canvas = this.refs.canvas;
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

      setTimeout(() => {
        requestAnimationFrame(() => { this.animFrame(); });
      }, 1000 / this.fps);
    }
  }

  handleStop = () => {
    if (!this.state.pause) {
      this.setState({ pause: true, pauseVal: 'play' });
    } else {
      this.setState({ pause: false, pauseVal: 'stop' }, () => {
        this.animFrame();
      });
    }
  }

  handleRandomize = () => {
    this.life.randomize();
  }

  handleClear = () => {
    this.life.clear();
  }

  handleGlider = () => {
    this.life.addGlider();
  }

  handleGliderGun = () => {
    this.life.addGliderGun();
  }

  increaseFps = () => {
    if (this.fps + 5 <= 61) {
      this.fps += 5;
    }
  }

  decreaseFps = () => {
    if (this.fps - 5 > 0) {
      this.fps -= 5;
    }
  }
  /**
   * Render
   */
  render() {
    return (
      <div>
        <div className="canvas-wrapper">
          <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        </div>
        <div className="btns">
          <button onClick={this.handleStop}>{this.state.pauseVal}</button>
          <button onClick={this.handleRandomize}>randomize</button>
          <button onClick={this.handleClear}>clear</button>
          <button onClick={this.handleGlider}>add glider</button>
          <button onClick={this.handleGliderGun}>add glider gun</button>
          <button onClick={this.increaseFps}>fps +</button>
          <button onClick={this.decreaseFps}>fps -</button>
        </div>
      </div>
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
        <LifeCanvas width={350} height={350} />
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
