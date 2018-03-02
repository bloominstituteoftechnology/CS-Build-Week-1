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
    this.pixelSize = 2;
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

    const pixelSize = this.pixelSize; //changes the pixel size

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
        
        const color = state === 1 ? 255 : 0;

        blockIndexArray.forEach((pixel) => {  // This block prints the selected pixel size as opposed to a single.
          imageData.data[pixel + 0] = color;
          imageData.data[pixel + 1] = color;
          imageData.data[pixel + 2] = color;
          imageData.data[pixel + 3] = 0xff;
        })
      }
    }

    ctx.putImageData(imageData, 0, 0);


    this.life.step(pixelSize);

    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  changeP(value) {
    document.getElementById('pText').innerHTML = value;
  }
  /**
   * Render
   */
  render() {
    let counter = this.pixelSize;
    return (
      <div className = "contentBox">
        <h1>Conway's Game of Life</h1>
        <div className = "canvasBox">
          <canvas
            ref="canvas"
            width={this.props.width}
            height={this.props.height}
          />
        </div>
        <p id="carouselBanner">Choose a pixel size.</p>
        <div className = "carousel">
          <p onClick={() => {
            this.pixelSize--;
            this.changeP(this.pixelSize);
            this.life.clear();
            this.life.randomize();
          }}>-</p>
          <p id = "pText">{counter}</p>
          <p onClick={() => {
            this.pixelSize++;
            this.changeP(this.pixelSize);
            this.life.clear();
            this.life.randomize();
          }}>+</p>
        </div>
      </div>
    );
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {

  render() {
    return (
      <LifeCanvas width={1000} height={400} />
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
