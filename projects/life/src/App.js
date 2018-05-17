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
  [0xff, 0x5f, 0x7f],
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
    this.randomize = this.randomize.bind(this);
    this.clear = this.clear.bind(this);
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
    //

    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, this.props.width, this.props.height)

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let buffer = imageData.data; // Obtained from getImageData()


    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++){
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];

        buffer[index + 0] = COLORS[currentNumber][0]; // Red: 0xff == 255, full intensity
        buffer[index + 1] = COLORS[currentNumber][1]; // Green: zero intensity
        buffer[index + 2] = COLORS[currentNumber][2]; // Blue: zero intensity
        buffer[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque
      }
    }


    ctx.putImageData(imageData, 0, 0);

    this.life.step();
    requestAnimationFrame(() => {this.animFrame()});

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
  }

  randomize() {
    this.life.randomize();
  }

  clear() {
    this.life.clear();
  }

  /**
   * Render
   */
  render() {
    return (<div>
              <canvas ref="canvas" width={this.props.width} height={this.props.height} />
              <button onClick={this.randomize}>Randomize Grid</button>
              <button onClick={this.clear}>Clear Grid</button>
            </div>)
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
