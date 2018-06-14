import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const canvasWidth = 400;
const canvasHeight = 300;

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
];

/**
 * CCA canvas
 */
class CCACanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.cca = new CCA(canvasWidth, canvasHeight);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.animFrame();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let cells = this.cca.getCells();

    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        // convert xy to index
        const index = (height * canvasWidth + width) * 4;

        let ccaStatus = cells[height][width];

        // change pixels at indexto match credentials

        screenBuffer[index + 0] = COLORS[ccaStatus][0]; // R
        screenBuffer[index + 1] = COLORS[ccaStatus][1]; // G
        screenBuffer[index + 2] = COLORS[ccaStatus][2]; // B
        screenBuffer[index + 3] = 255; // A
      }
    }

    /* debug purposes
    for (let i = 0; i < screenBuffer.length; i++) {
      screenBuffer[i++] = 234; // R
      screenBuffer[i++] = 234; // G
      screenBuffer[i++] = 234; // B
      screenBuffer[i] = 255; // A // not increasing here because the for loop does that
    }
    */
    // console.log('screenBuffer', screenBuffer);

    ctx.putImageData(imageData, 0, 0);

    // step the simulation forward
    this.cca.step();

    requestAnimationFrame(() => {
      this.animFrame();
    });
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
class CCAApp extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={canvasWidth} height={canvasHeight} />
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
