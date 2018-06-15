import React, { Component } from 'react';
import Life from './life';
import './App.css';

const canvasWidth = 800;
const canvasHeight = 600;

const COLORS = [
  [0, 0, 0],
  [0xff, 0xff, 0],
  [(0x5f, 0, 0x8f)],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f]
];

/**
 * Life canvas
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

    // getImageData(sx -- upper left x, sy -- upper left y, sw - width, sh - height);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let cells = this.life.getCells();
    // Here is the screen buffer array we can

    // So the sceenBuffer is all the data points listed
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
        // Here canvasHeight is constant, while height is each iteration up to that constant.
        const index = (height * canvasWidth + width) * 4; // should be taking and converting our xy grid into that 123412341234...????
        // height = 0, canvasWidth = 2, width = 0 => index = 0
        // height = 0, canvasWidth = 2, width = 1 => index = 4
        // height = 0,                            => index = 8
        // height = 1,                            => index = 12

        // console.log('height', height);
        // console.log('index', index);

        // Update Data:
        // lifeStatus is either 0 - black or 1 - lavender
        // With more colors, lifeStatus will increase ALTHOUGH, not in this program - you
        // would need to do that in the guided demo -- cca
        const lifeStatus = cells[height][width];
        // console.log('lifeStatus', lifeStatus);

        // change pixels at index to match lifeStatus
        screenBuffer[index + 0] = COLORS[lifeStatus][0]; // R
        screenBuffer[index + 1] = COLORS[lifeStatus][1]; // G
        screenBuffer[index + 2] = COLORS[lifeStatus][2]; // B
        screenBuffer[index + 3] = 255; // A
      }
    }

    // To understand this: https://www.w3schools.com/tags/canvas_getimagedata.asp
    // A 2 by 2 Array here has 16 values in its sceenBuffer.  That is, 2x2 = 4 pixels,
    // each with associated R, G, B, and A values.  Thus 4 pixels times 4 RGBA values = 16.
    // Only two colors: lavender (230, 230, 250, 255) and black (0,0,0,255)
    // console.log('screenBuffer in animFrame: ', screenBuffer);

    ctx.putImageData(imageData, 0, 0);

    // If you want to ZOOM in: // Could use this to make a controllable zoom with buttons.
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, 3 * canvas.width, 3 * canvas.height);

    // Updates / Step the simulation forward:
    this.life.step();
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
