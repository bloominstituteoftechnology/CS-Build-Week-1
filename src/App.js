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

    this.life = new Life(this.props.width, this.props.height);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // !!! TODO
    requestAnimationFrame(() => { this.animFrame(); });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    // !!! TODO
    let width = this.props.width;
    let height = this.props.height;

    // Convert data from life into a bitmap and show it on the canvas
    let cells = this.life.getCells();

    // Get canvas buffer
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        let lifeStatus = cells[row][col]
        let color = lifeStatus === 0? 0 : 255;

        let index = ((row * width) + col) * 4;

        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
        imageData.data[index + 3] = 0xff; //opaque
      }
    }
    //DRAW IT BACK
    ctx.putImageData(imageData, 0, 0);

    // next gen
    this.life.step();

    // after render, draw another frame
    requestAnimationFrame(() => { this.animFrame(); });
  }

  /**
   * Render
   */
  render() {
    // TODO
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
