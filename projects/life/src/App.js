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
    const pixelSize = 40;

    const canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y+=pixelSize) {
      for (let x = 0; x < width; x+=pixelSize) {
        const state = cells[y][x];
        const index = (y * width + x) * 4;
        const blockIndexArray = [];
        for (let yGrowth = 0; yGrowth < pixelSize; yGrowth++){
          for (let xGrowth = 0; xGrowth < pixelSize; xGrowth++) {
            blockIndexArray.push(((y + yGrowth) * width + (x + xGrowth)) * 4);
          }
        }
        
        const color = state === 1 ? Math.floor(Math.random() * 256) : 0;

        blockIndexArray.forEach((pixel) => {  // This block prints a 4 x 4 pixel as opposed to a single.
          imageData.data[pixel + 0] = color;
          imageData.data[pixel + 1] = color;
          imageData.data[pixel + 2] = color;
          imageData.data[pixel + 3] = 0xff;
        })

        // const color = state === 1 ? 255 : 0; <<<<<<< This block was the former code to print the "live" cells in white
        // imageData.data[index + 0] = color; // red
        // imageData.data[index + 1] = color; // green
        // imageData.data[index + 2] = color; // blue
        // imageData.data[index + 3] = 0xff; // alpha, 0xff === 255 === opaque
        
        // if (state === 0) { <<<<<< This block formerly color all live cells a random color, and all dead cells black
        //   imageData.data[index + 0] = 0; // red
        //   imageData.data[index + 1] = 0; // green
        //   imageData.data[index + 2] = 0; // blue
        //   imageData.data[index + 3] = 0xff; // alpha, 0xff === 255 === opaque
        // } else {
        //   imageData.data[index + 0] = Math.floor(Math.random() * 256); // red
        //   imageData.data[index + 1] = Math.floor(Math.random() * 256); // green
        //   imageData.data[index + 2] = Math.floor(Math.random() * 256); // blue
        //   imageData.data[index + 3] = 0xff; // alpha, 0xff === 255 === opaque
        // }
      }
    }

    ctx.putImageData(imageData, 0, 0);


    this.life.step(pixelSize);

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
