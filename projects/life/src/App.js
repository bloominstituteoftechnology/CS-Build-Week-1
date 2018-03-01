import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 * 
 * 
 */
const COLORS = [[255,255,255], [0,0,0]];

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
    const cells = this.life.getCells();
    const height = this.props.height;
    const width = this.props.width;
    //Get canvas framebuffer, a packed RGBA array

    const canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    //uppdate image Data based on the cells
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x ++) {
        const state = cells[y][x];
        const color = COLORS[state]
        const index = (y * width + x) * 4;
        imageData.data[index + 0] = color[0] // red
        imageData.data[index + 1] = color[1] // green
        imageData.data[index + 2] = color[2] //blue
        imageData.data[index + 3] = 0xff // alpha   
      }
    }
//put the new image data back on the canvas
ctx.putImageData( imageData, 0, 0);

//itterate next step
this.life.step();

// request another animation frame
requestAnimationFrame(() => {this.animFrame()});

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
