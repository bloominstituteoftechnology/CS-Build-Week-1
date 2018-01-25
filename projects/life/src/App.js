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

    this.pixelSize = 1;

    this.life = new Life(props.width, props.height, this.pixelSize);
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
    const { width, height } = this.props;

    const cells = this.life.getCells();
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    // Change behavior depending on pixel size
    // if greater than one draw rects to the canvas
    // else manipulate individual pixels directly
    if (this.pixelSize > 1) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.drawCell(x, y, cells[y][x], ctx);
        }
      }
    } else {
      const imageData = ctx.getImageData(0, 0, width, height);

      cells.forEach((row, y) => {
        row.forEach((cell, x) => {
          const idx = (y * width + x) * 4;
          let color = 0;

          if (cell === 1) {
            color = 255;
          }

          imageData.data[idx] = color;
          imageData.data[idx + 1] = color;
          imageData.data[idx + 2] = color;
          imageData.data[idx + 3] = 0xff;
        });
      });

      ctx.putImageData(imageData, 0, 0);
    }

    this.life.step();

    requestAnimationFrame(() => this.animFrame());
  }

  // Larger pixel version
  drawCell(x, y, status, ctx) {
    ctx.beginPath();
    ctx.rect(
      x * this.pixelSize,
      y * this.pixelSize,
      this.pixelSize,
      this.pixelSize
    );
    ctx.fillStyle = status === 1 ? "white" : "black";
    ctx.fill();
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
        <LifeCanvas width={600} height={400} />
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
