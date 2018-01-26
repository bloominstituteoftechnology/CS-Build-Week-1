import React, { Component } from "react";
import Life from "./life";
import "./App.css";

function getRandomColors() {
  return Array.from({ length: 3 }, () => ~~(Math.random() * 255));
}
/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.prevTime = null;

    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(timeStamp => {
      this.animFrame(timeStamp);
    });
  }

  /**
   * Handle an animation frame
   */
  animFrame(timeStamp) {
    if (!this.prevTime) {
      this.prevTime = timeStamp;
    }
    requestAnimationFrame(timeStamp => this.animFrame(timeStamp));
    let delta = timeStamp - this.prevTime;
    let interval = 1000 / 10;

    if (delta > interval) {
      this.prevTime = timeStamp - delta % interval;
      const { width, height } = this.props;

      const cells = this.life.getCells();
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;

      const imageData = ctx.getImageData(0, 0, width, height);

      cells.forEach((row, y) => {
        row.forEach((cell, x) => {
          const idx = (y * width + x) * 4;
          let color = [0, 0, 0];

          if (cell === 1) {
            color = getRandomColors();
          }

          imageData.data[idx] = color[0];
          imageData.data[idx + 1] = color[1];
          imageData.data[idx + 2] = color[2];
          imageData.data[idx + 3] = 0xff;
        });
      });

      ctx.putImageData(imageData, 0, 0);
    }

    this.life.step();
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
        <LifeCanvas width={240} height={200} />
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
