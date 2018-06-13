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
    // let cells = this.cca.getCells();

    // Here is the screen buffer array we can manipulate:

    let screenBuffer = imageData.data;
    let cells = this.cca.getCells();

    // for (let i = 0; i < 1000; i += 4) {
    //   screenBuffer[i + 0] = 0; //R
    //   screenBuffer[i + 1] = 0; //G
    //   screenBuffer[i + 2] = 0; //B
    //   screenBuffer[i + 3] = 255; //A
    // }

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        // conver xy to index
        let index = (height * canvasWidth + width) * 4;

        let ccaStatus = cells[height][width];
        // change pixles at index to match cca
        screenBuffer[height + 0] = 0; //R
        screenBuffer[height + 1] = 0; //G
        screenBuffer[height + 2] = 0; //B
        screenBuffer[height + 3] = 255; //A
      }
    }

    console.log('screenBuffer in animFrame: ', screenBuffer);

    ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>;
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
    )
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