import React, { Component } from "react";
import CCA from "./cca";
import "./App.css";

function getRandomColors() {
  return Array.from({ length: 3 }, () => ~~(Math.random() * 255));
}

const COLORS = Array.from({ length: 16 }, () => getRandomColors());

/**
 * CCA canvas
 */
class CCACanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.cca = new CCA(props.width, props.height);
    this.cca.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const w = this.props.width;
    const h = this.props.height;

    const cells = this.cca.getCells();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, w, h);

    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        const idx = (y * w + x) * 4;

        imageData.data[idx] = COLORS[cell][0];
        imageData.data[idx + 1] = COLORS[cell][1];
        imageData.data[idx + 2] = COLORS[cell][2];
        imageData.data[idx + 3] = 0xff;
      });
    });

    ctx.putImageData(imageData, 0, 0);

    this.cca.step();

    requestAnimationFrame(() => this.animFrame());
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
 * CCA holder component
 */
class CCAApp extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={400} height={300} />
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
        <CCAApp />
      </div>
    );
  }
}

export default App;
