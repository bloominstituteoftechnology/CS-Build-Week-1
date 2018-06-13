import React, { Component } from "react";
import Life from "./life";
import "./App.css";

const canvasWidth = 600;
const canvasHeight = 400;
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
    // this.life.randomize();
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

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();
    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        let index = (height * canvasWidth + width) * 4;
        if (cells[height][width] === 0) {
          screenBuffer[index + 0] = 255;
          screenBuffer[index + 1] = 255;
          screenBuffer[index + 2] = 255;
          screenBuffer[index + 3] = 255;
        } else if (cells[height][width] === 1) {
          screenBuffer[index + 0] = 0;
          screenBuffer[index + 1] = 0;
          screenBuffer[index + 2] = 0;
          screenBuffer[index + 3] = 255;
        }
      }
    }

    // console.log("Screenbuffer in animFrame", screenBuffer);
    ctx.putImageData(imageData, 0, 0);

    this.life.step();
    setInterval(() => {
      requestAnimationFrame(() => {
        this.animFrame();
      });
    }, 1000);
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
        <LifeCanvas width={canvasWidth} height={canvasHeight} />
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
