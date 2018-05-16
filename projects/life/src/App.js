import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0x2b, 0x6d, 0xcf],
  [0xff, 0x82, 0x2f],
]

// let test = 10;
// let counter = 0;

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
    // if (test !== 0) {
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let currentImage = imageData.data;

    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) *4;

        const currentNumber = cells[row][col];
        
        if (currentNumber === undefined) console.log(test);
        // console.log(currentNumber, "Here is the counter:", ++counter);
        currentImage[index + 0] = COLORS[currentNumber][0]; // set Red value
        currentImage[index + 1] = COLORS[currentNumber][1]; // set Green value
        currentImage[index + 2] = COLORS[currentNumber][2]; // set Blue value
        currentImage[index + 3] = 0xff;
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
    // test--;
  // }
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
        <LifeCanvas width={400} height={300} />
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
