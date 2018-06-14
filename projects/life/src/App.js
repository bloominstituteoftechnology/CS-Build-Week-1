import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [255, 255, 255],
  [150, 0, 0], // red
  [0, 150, 0], // green
  [0, 0, 150], // blue
  [0, 0, 0], // black

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
  
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    ///  
    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    let cells = this.life.getCells();
    let canvas = this.refs.canvas;
    
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.props.width, this.props.height);
    let imageData = ctx.getImageData(0,0, canvas.width, canvas.height);

    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];

        imageData.data[index + 0] = COLORS[currentNumber][0];
        imageData.data[index + 1] = COLORS[currentNumber][1];
        imageData.data[index + 2] = COLORS[currentNumber][2];
        imageData.data[index + 3] =  0xff;
        // buffer[index + 0] = 0; // Red: 0xff == 255, full intensity
        // buffer[index + 1] = 0xff; // Green: zero intensity
        // //buffer[index + 2] = 255; // Blue: zero intensity
        // //buffer[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque
      }
    }
   
    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    // Next generation of life
   requestAnimationFrame(() => {
     this.animFrame();

    });
    // setTimeout(() => {
    //   requestAnimationFrame(() => {this.animFrame()});
    // }, 1000/framerate);
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
        <LifeCanvas width={400} height={600} />
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
