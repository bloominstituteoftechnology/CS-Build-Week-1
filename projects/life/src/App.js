import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [[255, 255, 255], [0, 0, 0]];

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
    this.continueAnimaiton = true;
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  componentWillUnmount() {
    this.continueAnimaiton = false;
  }
  /**
   * Handle an animation frame
   */
  animFrame() {
    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
    const width = this.props.width;
    const height = this.props.height;
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const status = cells[y][x];

        imageData.data[index + 0] = COLORS[status][0];
        imageData.data[index + 1] = COLORS[status][1];
        imageData.data[index + 2] = COLORS[status][2];
        imageData.data[index + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    if (this.continueAnimaiton) {
      requestAnimationFrame(() => {
        this.animFrame();
      });
    }
  }

  handleStop = () => {
    this.continueAnimaiton = false;
  };

  handleStart = () => {
    this.continueAnimaiton = true;
    this.animFrame();
  };

  handleClear = () => {
    this.continueAnimaiton = false;
    this.refs.canvas
      .getContext('2d')
      .clearRect(0, 0, this.props.width, this.props.height);
    this.life.clear();
  };

  handleRandom = () => {
    this.continueAnimaiton = false;
    this.life.randomize();
    this.animFrame();
  };

  // handleDropGlider = () => {
  //   let width = this.props.width;
  //   let height = this.props.height;
  //   let x = Math.floor(Math.random() * width);
  //   let y = Math.floor(Math.random() * height);
  //   let canvas = this.refs.canvas;
  //   let ctx = canvas.getContext('2d');
  //   let imageData = ctx.getImageData(0, 0, width, height);
  //   const index = (y * width + x) * 4;
  //   if (imageData.data[index])
  // };

  /**
   * Render
   */
  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
        <button onClick={this.handleStop}>STOP</button>
        <button onClick={this.handleStart}>START</button>
        <button onClick={this.handleClear}>CLEAR</button>
        <button onClick={this.handleRandom}>RANDOM</button>
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
        <LifeCanvas width={500} height={400} />
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
