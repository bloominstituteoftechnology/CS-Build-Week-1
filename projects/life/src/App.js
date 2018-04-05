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

    this.life = new Life(props.width, props.height); // create new instance of life class and pass in width and height
    this.life.randomize(); // using the width and height from created instance, randomize the new grid with black and white colors
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => { this.animFrame() }); // call the animFrame function
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let width = this.props.width;
    let height = this.props.height;

    // Update life and get cells
    let cells = this.life.getCells(); // get which grid to use

    // Get canvas framebuffer, a packed RGBA array
    let canvas = this.refs.canvas; // access the canvas element in the render function below and save it to a variable
    let ctx = canvas.getContext('2d'); // create drawing object for our canvas and save as a variable, we'll be using this to draw on
    let imageData = ctx.getImageData(0, 0, width, height); // getimagedata() returns imagedata object representing pixel data (every four indexes) for area of canvas
    // 0 - x coordinate of upper left corner, 0 - y coordinate of upper left corner, width - width, height - height
    // imageData represents 1 dimensional array that holds rgba data every four numbers represents 1 pixel

    // Convert the cell values into white or black for the canvas
    // loop over cells columns and rows
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        // find four values in image data that corresponds to the cell we're on
        let index = (y * width + x) * 4; // Index needs to be multiplied by 4 because there are 4 array entries per pixel, Red, Green, Blue, and Alpha:

        // state at this coordinate
        let color = cells[y][x] ? 0xff : 0x00; // if cells are alive (1) then color is black, otherwise color is white

        // FYI: Alpha channel controls how transparent a pixel is.
        imageData.data[index + 0] = color; // Red channel
        imageData.data[index + 1] = color; // Green channel
        imageData.data[index + 2] = color; // Blue channel
        imageData.data[index + 3] = 0xff;  // Alpha channel, 0xff = opaque
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0); // paints the image

    // Next generation of life
    this.life.step(); // make a new grid

    // Request another animation frame
    requestAnimationFrame(() => { this.animFrame() });
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