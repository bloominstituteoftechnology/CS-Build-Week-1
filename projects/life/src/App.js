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
    //
    // !!!! IMPLEMENT ME !!!!
    // Request another animation frame
    // Update life and get cells
    let cells = this.life.getCells();
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++) {

        let colorIndex = (row * this.props.width + col) * 4;

        let currentCellIndex = cells[row][col];

        let color = currentCellIndex === 1? 255 : 0;

        imageData.data[colorIndex + 0] = color;
        imageData.data[colorIndex + 1] = color;
        imageData.data[colorIndex + 2] = color;
        imageData.data[colorIndex + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(() => {this.animFrame()});
    //
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
