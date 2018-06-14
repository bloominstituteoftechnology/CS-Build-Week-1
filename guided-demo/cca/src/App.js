import React, { Component } from "react";
import Life from "./cca";
import "./App.css";

const COLORS = [
  [0, 0, 0],
  [0xff, 0xff, 0],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f]
];
const canvasHeight = 300;
const canvasWidth = 400;

/**
 * CCA canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.life = new Life(canvasWidth, canvasHeight);
  }

  /**
   * Component did mount
   */
  
  componentDidMount() {
    console.log("hello");
    console.log(this.animFrame());
    requestAnimationFrame(() => {this.animFrame()});
  }
  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();

    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        //convert x,y to index
        let index = (height * canvasWidth + width) * 4;
        let ccaStatus = cells[height][width];
        screenBuffer[index + 0] = COLORS[ccaStatus][0];
        screenBuffer[index + 1] = COLORS[ccaStatus][1];
        screenBuffer[index + 2] = COLORS[ccaStatus][2];
        screenBuffer[index + 3] = 255;
      }
    }
    // console.log("Screenbuffer in Animframe:", screenBuffer);
    ctx.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />;
  }
}

/**
 * CCA holder component
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
