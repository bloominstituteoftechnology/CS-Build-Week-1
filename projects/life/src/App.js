import React, { Component } from 'react';
import Life from './life';
import './App.css';


const canvasWidth= 400;
const canvasHeight = 300;

const COLORS = [
  [0, 0, 0],
  [0xff, 0xf0, 0],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
]
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
    this.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    // instead of using getElementbyId, we just used refs to refer to the entire dom element
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let cells = this.life.getCells();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    

    let screenBuffer = imageData.data;
    for (let height = 0; height < canvasHeight; height++) {
      for(let width = 0; width < canvasWidth; width++) {
        let index = (height * canvasWidth + width) * 4;
        let ccaStatus = cells[height][width];

        screenBuffer[index + 0] = COLORS[ccaStatus][0]; // R
        screenBuffer[index + 1] = COLORS[ccaStatus][1]; // g
        screenBuffer[index + 2] = COLORS[ccaStatus][2];// b 
        screenBuffer[index + 3] = 255; // a
      }
    }

    ctx.putImageData(imageData,0, 0);

    // Step the simulation forward 
    this.life.step();
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
        <LifeApp />
      </div>
    );
  }
}

export default App;
