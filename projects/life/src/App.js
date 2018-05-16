import React, { Component } from 'react';
import Life from './life';
import './App.css';

const blackOrWhite = [[0, 0, 0], [255, 255, 255]];

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
  }

  /**
   * Component did mount
   */
  componentDidMount() {
      this.animFrame();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //

    // Request another animation frame
    this.life.step();
    // Update life and get cells
    let life = this.life.getCells();
    // Get canvas framebuffer, a packed RGBA array
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let buffer = imageData.data;

    // Convert the cell values into white or black for the canvas
    for (let row = 0; row < this.props.height; row++) {
      for (let column = 0; column < this.props.width; column++) {
        let index = (row * this.props.width + column) * 4;

        let currentNumber = life[row][column] % 2;

        buffer[index + 0] = blackOrWhite[currentNumber][0];
        buffer[index + 1] = blackOrWhite[currentNumber][1];
        buffer[index + 2] = blackOrWhite[currentNumber][2];
        buffer[index + 3] = 0xff;
      }
    }
    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    // Next generation of life
    this.life.step();
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animFrame();
      });
    }, 500);
    
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />;
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
        <LifeCanvas width={100} height={100} />
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
