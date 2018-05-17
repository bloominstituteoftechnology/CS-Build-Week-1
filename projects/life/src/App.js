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
    const framerate = 60;
    const width = this.props.width;
    const height = this.props.height;

    const cells = this.life.getCells();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    // ctx.imageSmoothingEnabled = false;
    // ctx.scale(2, 2);
    // These do nothing :/
    const imageData = ctx.getImageData(0, 0, width, height);

    // const newLife = (event) => {
    //   const mouseX = event.layerX;
    //   const mouseY = event.layerY;

    //   cells[mouseY][mouseX] = 2;
    // }

    // canvas.addEventListener('mousemove', newLife);

    // Adding an event listener every frame causes performance problems after a time, and
    // eventually crashes the tab.

    const rgba = (index, r, g, b, a) => {
      imageData.data[index + 0] = r; // Red
      imageData.data[index + 1] = g; // Green 
      imageData.data[index + 2] = b; // Blue 
      imageData.data[index + 3] = a;  // Alpha
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const lifeStatus = cells[y][x];

        switch (lifeStatus) {
          case 0:
            rgba(index, 0, 16, 0, 255);
            break;
          case 1:
            rgba(index, 0, 200, 0, 255);
            break;
          case 2:
            rgba(index, 200, 0, 0, 255);
            break;
          default:
            rgba(index, 0, 16, 0, 255);
            break;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    setTimeout(() => {
      requestAnimationFrame(() => {this.animFrame()});
    }, 1000 / framerate);
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
        <LifeCanvas width={1024} height={768} />
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
