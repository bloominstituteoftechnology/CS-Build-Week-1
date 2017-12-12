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
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    // !!! TODO
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    this.life = new Life(400, 400);
    this.life.clear();
    this.life.randomize();
    requestAnimationFrame(this.animFrame.bind(this));
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    // !!! TODO
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, this.props.width, this.props.height);
    let pixels = imageData.data;
    let width = this.props.width;
    const drawPixel = (x, y, r, g, b) => {
      let index = ((y * width) + x) * 4;
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = 0xff;
    }
    const cells = this.life.getCells();
    cells.forEach((row, y) => row.forEach((cell, x) => {
      cell ? drawPixel(x, y, 255, 255, 255) : drawPixel(x, y, 0, 0, 0);
    }))
    // Manipulate the data
    ctx.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(this.animFrame.bind(this));
    // Convert data from life into a bitmap and show it on the canvas

  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
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
