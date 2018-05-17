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
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // // Here is the screen buffer array we can manipulate:

    // imageData.data[0] = 0;
    // imageData.data[1] = 0;
    // imageData.data[2] = 0;

    // Set the pixel at 10,20 to pure red and display on the canvas:

    let buffer = imageData.data; // Obtained from getImageData()

    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++){
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];
        let color = currentNumber === 1 ? 0x00 : 0xff;
        buffer[index] = color;
        buffer[index + 1] = color;
        buffer[index + 2] = color;
        buffer[index + 3] = 0xff;
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
        <LifeCanvas width={500} height={400} />
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
