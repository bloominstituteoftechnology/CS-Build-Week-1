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
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  randomize = () => {
    this.life.randomize();
  }
  clear = () => {
    this.life.clear();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //

    const cells = this.life.getCells();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const imageCopy = imageData.data;

    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        const idx = (row * this.props.width + col) * 4;
        const color = cells[row][col] ? 0 : 255;
        imageCopy[idx] = color;
        imageCopy[idx + 1] = color;
        imageCopy[idx + 2] = color;
        imageCopy[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(() => {
      this.animFrame();
    });

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
  }

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
        <br/>
        <button onClick={this.randomize}>Randomize</button>
        <button onClick={this.clear}>Clear</button>
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
        <LifeCanvas width={600} height={400} />
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
