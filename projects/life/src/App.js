import React, { Component } from 'react';
import Life from './life';
import './App.css';

// -------------  Dead         Alive
const COLORS = [[0, 0, 0], [0, 255, 0]];

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
    let width = this.props.width;
    let height = this.props.height;
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.context.getImageData(0, 0, width, height);

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
    let cells = this.life.getCells()
    // get each pixel and set each one's RGBA to correct color values
    for (let y = 0; y < height; y++) {
      // get the index into imageData
      const index = (y * width + x) * 4; // RGBA = 4 = 1 px
      // returns value of cell either 1 or 0
      let state = cells[y][x];

      // only two colors life (1) and death (0)
      let color = state === 0 ? COLORS[0] : COLORS[1];
      imageData.data[index + 0] = color; // red channel
      imageData.data[index + 1] = color; // green channel
      imageData.data[index + 2] = color; // blue channel
      imageData.data[index + 3] = 0xff; // alpha channel; opaque
    }
    // put imageData back on canvas
    ctx.context.putImageData(imageData, 0, 0);

    // next set of life
    this.life.step();
    // request another frame
    requestAnimationFrame(() => {
      this.animFrame();
    })
    
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
