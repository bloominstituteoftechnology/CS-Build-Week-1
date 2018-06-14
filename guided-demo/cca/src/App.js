import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const canvasWidth = 800;
const canvasHeight = 600;

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [(0x5f, 0, 0x8f)],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f]
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
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let cells = this.cca.getCells();
    // Here is the screen buffer array we can

    let screenBuffer = imageData.data;

    // for (let i = 0; i < 1000; i += 4) {
    //   screenBuffer[i + 0] = 0; // R
    //   screenBuffer[i + 1] = 0; // G
    //   screenBuffer[i + 2] = 0; // B
    //   screenBuffer[i + 3] = 255; // A
    // }

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        //convert xy to index
        // 4 is the # of pixels -- changing this # drastically alters rendered animation
        const index = (height * canvasWidth + width) * 4; // should be taking and converting our xy grid into that 123412341234...????

        const ccaStatus = cells[height][width];

        // change pixels at index to match ccaStatus
        screenBuffer[index + 0] = COLORS[ccaStatus][0]; // R
        screenBuffer[index + 1] = COLORS[ccaStatus][1]; // G
        screenBuffer[index + 2] = COLORS[ccaStatus][2]; // B
        screenBuffer[index + 3] = 344; // A
      }
    }

    // console.log('screenBuffer in animFrame: ', screenBuffer);

    ctx.putImageData(imageData, 0, 0);

    this.cca.step();
    requestAnimationFrame(() => this.animFrame());
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
