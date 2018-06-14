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
    //
    // !!!! IMPLEMENT ME !!!!
    //
    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();

    for (let height = 0; height < canvas.height; height++) {
      for (let width = 0; width < canvas.width; width++) {
        let index = (height * canvas.width + width) * 4;

        let lifeStatus = cells[height][width];
        let color = lifeStatus === 0 ? 0x00 : 0xff;

        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
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
    this.continueAnimaiton = true;
    this.life.randomize();
    this.animFrame();
  };

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
        <button onClick={this.handleStop}>Pause</button>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleClear}>Clear</button>
        <button onClick={this.handleRandom}>Random</button>
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
