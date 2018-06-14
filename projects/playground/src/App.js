import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0x00, 0x80, 0xff],
  [0xf2, 0x85, 0x00],
  [0x00, 0x7b, 0xfa],
  [0xed, 0x80, 0x00],
  [0x00, 0x76, 0xf5],
  [0xe8, 0x7b, 0x00]
];

const canvasWidth = 800;
const canvasHeight = 800;

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

    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let cells = this.life.getCells();

    // Here is the screen buffer array we can manipulate:

    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        let index = (height * canvasWidth + width) * 4;

        let lifeStatus = cells[height][width];

        // change pixels at index to match lifeStatus
        //console.log('lifeStatus', lifeStatus);
        // console.log('screenBuffer', screenBuffer);
        // console.log('cells', cells);
        screenBuffer[index + 0] = COLORS[lifeStatus][0];
        screenBuffer[index + 1] = COLORS[lifeStatus][1];
        screenBuffer[index + 2] = COLORS[lifeStatus][2];
        screenBuffer[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    requestAnimationFrame(() => {
      this.animFrame();
    });
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
