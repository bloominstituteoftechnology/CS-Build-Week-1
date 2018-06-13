import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const canvasWidth = 600;
const canvasHeight = 500;

const COLORS = [
  [0xf5, 0xf5, 0xdc],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0xb0, 0xe0, 0xe6],
  [0, 0x5f, 0x7f],
  [0x00, 0xff, 0xff],
  [0x7b, 0xa0, 0x5b],
  [0xe3, 0x42, 0x34],
  [0xcc, 0x88, 0x99],
  [0x00, 0xff, 0x7f],
  [0x80, 0x00, 0x00]
]

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
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    
    let ctx = canvas.getContext('2d');

    let imageData= ctx.getImageData(0,0, canvas.width, canvas.height);
    let cells = this.cca.getCells();
    // Here is the screen buffer array we can manipulate:
    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        //convert xy to index
        let index = (height * canvasWidth + width) * 4;
        let ccaStatus = cells[height][width];

        //change pixels at index to match ccstatus
        screenBuffer[index + 0] = COLORS[ccaStatus][0];
        screenBuffer[index + 1] = COLORS[ccaStatus][1];
        screenBuffer[index + 2] = COLORS[ccaStatus][2];
        screenBuffer[index + 3] = 255;
      }
    }

    // console.log('screenBuffer in animFrame: ', screenBuffer);
    ctx.putImageData(imageData, 0, 0);

    // Step the simulation forward
    this.cca.step();
    requestAnimationFrame(() => this.animFrame());

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
        <CCACanvas width={400} height={300} />
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
      <h1>Cellular Autonoma</h1>
        <CCAApp />
      </div>
    );
  }
}

export default App;