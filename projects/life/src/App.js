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
    this.state = { running: true };
    this.stopStart = this.stopStart.bind(this);
  }

  stopStart() {
    console.log("Inside stop pre change: ", this.state.running);
    this.setState({ running: !this.state.running }, () => {
      console.log("Inside stop post change: ", this.state.running);
      if (this.state.running) {
        requestAnimationFrame(() => {
          this.animFrame();
        });
      }
    });
  }
  // this.life.randomize();

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
    // console.log("Props running?: ", this.state.running);
    if (!this.state.running) {
      return;
    }
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
          screenBuffer[index + 1] = 80;
          screenBuffer[index + 2] = 149;
          screenBuffer[index + 3] = 255;
        } else if (cells[height][width] === 1) {
          screenBuffer[index + 0] = 255;
          screenBuffer[index + 1] = 202;
          screenBuffer[index + 2] = 223;
          screenBuffer[index + 3] = 255;
        }
      }
    }

    // console.log("Screenbuffer in animFrame", screenBuffer);
    ctx.putImageData(imageData, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, 5 * canvas.width, 5 * canvas.height);

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
      <div>
        <div>
          <canvas
            ref="canvas"
            width={this.props.width}
            height={this.props.height}
          />
        </div>
        <div>
          <button onClick={this.stopStart}>Start/Stop</button>
          <button
            onClick={() => {
              this.life.randomize();
            }}
          >
            Randomize
          </button>
          <button
            onClick={() => {
              this.life.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.life.dropGlider();
            }}
          >
            Drop Glider
          </button>
        </div>
      </div>
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
        <LifeCanvas
          running={this.props.running}
          width={canvasWidth}
          height={canvasHeight}
        />
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
