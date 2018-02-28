import React, { Component } from "react";
import Life from "./life";
import "./App.css";

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
    //
    const cells = this.life.getCells();
    const height = this.props.height;
    const width = this.props.width;

    const canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const index = (y * width + x) * 4;
        // const color = state === 1 ? 255 : 0;
        // imageData.data[index + 0] = color; // red
        // imageData.data[index + 1] = color; // green
        // imageData.data[index + 2] = color; // blue
        // imageData.data[index + 3] = 0xff; // alpha, 0xff === 255 === opaque
        if (state === 0) {
          imageData.data[index + 0] = 0; // red
          imageData.data[index + 1] = 0; // green
          imageData.data[index + 2] = 0; // blue
          imageData.data[index + 3] = 0xff; // alpha, 0xff === 255 === opaque
        } else {
          imageData.data[index + 0] = Math.floor(Math.random() * 256); // red
          imageData.data[index + 1] = Math.floor(Math.random() * 256); // green
          imageData.data[index + 2] = Math.floor(Math.random() * 256); // blue
          imageData.data[index + 3] = 0xff; // alpha, 0xff === 255 === opaque
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
      />
    );
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
        <LifeCanvas width={800} height={700} />
      </div>
    );
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
