import React, { Component } from 'react';
import Life from './life';
import './App.css';

// const COLORS = [
//   [0, 0, 0],
//   [0x8f, 0, 0x5f],
//   [0x5f, 0, 0x8f],
//   [0, 0, 0xff],
//   [0, 0x5f, 0x7f],
//   [0x5f, 0x8f, 0x7f],
//   [0x8f, 0xff, 0x7f],
//   [0xff, 0x5f, 0x7f],
// ]

const COLORS = [
  [0, 0, 0],
  [0xff, 0xff, 0xff],
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

    this.life.step();
    let width = this.props.width;
    let height = this.props.height;

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    let imageData = ctx.getImageData(0, 0, width, height);

    for(let row = 0; row < height; row++){
      for(let col = 0; col < width; col++){
        let lifeGrid = this.life.getCells();
        let index = (row * width + col) * 4;
        let color = lifeGrid[row][col];

        //change red value
        imageData.data[index + 0] =  COLORS[color][0];
        
        //change green value
        imageData.data[index + 1] =  COLORS[color][1];
        
        //change blue value
        imageData.data[index + 2] =  COLORS[color][2];
        
        // change alpha value
        imageData.data[index + 3] =  0xff; //alpha channel solid
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(() => this.animFrame());
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
