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
    ctx.imageSmoothingEnabled = false;
    ctx.scale(2, 2);
    const imageData = ctx.getImageData(0, 0, width, height);

    const newLife = (event) => {
      const mouseDrag = (e) => {
        const mouseX = e.layerX;
        const mouseY = e.layerY;
  
        cells[mouseY][mouseX] = 1;
      }
      const mouseUp = () => {
        canvas.removeEventListener('mousemove', mouseDrag);
      }
      canvas.addEventListener('mousemove', mouseDrag);
      canvas.addEventListener('mouseup', mouseUp)
    }
    canvas.addEventListener('mousedown', newLife);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const lifeStatus = cells[y][x];
        const color = lifeStatus === 0 ? 0 : 255;

        imageData.data[index + 0] = color; // Red
        imageData.data[index + 1] = color; // Green 
        imageData.data[index + 2] = color; // Blue 
        imageData.data[index + 3] = 255;  // Alpha
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
