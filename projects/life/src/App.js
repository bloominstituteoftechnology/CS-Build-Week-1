import React, { Component } from 'react';
import Life from './life';
import './App.css';

const canvasWidth = 2;
const canvasHeight = 2;

const COLORS = [[0, 0, 0], [0xe6, 0xe6, 0xfa]];

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

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let cells = this.life.getCells();
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

        const lifeStatus = cells[height][width];
        console.log('lifeStatus:', lifeStatus);

        // change pixels at index to match lifeStatus
        screenBuffer[index + 0] = COLORS[lifeStatus][0]; // R
        screenBuffer[index + 1] = COLORS[lifeStatus][1]; // G
        screenBuffer[index + 2] = COLORS[lifeStatus][2]; // B
        screenBuffer[index + 3] = 255; // A
      }
    }

    // console.log('screenBuffer in animFrame: ', screenBuffer);

    ctx.putImageData(imageData, 0, 0);

    // Updates / Step the simulation forward:
    // this.life.step();
    // requestAnimationFrame(() => this.animFrame());
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
