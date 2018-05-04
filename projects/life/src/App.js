import React, { Component } from 'react';
import Life from './life';
import './App.css';

const TYPE = {
  ALIVE: 1,
  DEAD: 0,
  ZOMBIE: 2,
};

const ALIVE = [255, 255, 255]; /* white */
const PROB = 0.1; /* seeded probability of life */

const DEAD = [0, 0, 0]; /* black */

const ZOMBIE = [255, 121, 77]; /* red */
// const ZOMBIE_PROB = 0.01; /* NOT IMPLEMENTED */
// const ZOMBIE_NO = 1;

/* canvas width/height */
const WIDTH = 720;
const HEIGHT = 480;

const zombie = {
  x: (Math.random() * WIDTH) | 0,
  y: (Math.random() * HEIGHT) | 0,
};

// window.alert(`zombie loc: (${zombie.x}, ${zombie.y})`);
// console.log('original zombie', zombie);

const STEPS = 1; /* calc next generation per no. of `step()`s called */
const DELAY = 0; /* steps to delay before anim starts */

/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height, STEPS, DELAY);
    this.life.randomize(PROB, zombie);
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
    this.life.step();

    const w = this.props.width;
    const h = this.props.height;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, w, h);

    for (let row = 0; row < h; row++) {
      for (let col = 0; col < w; col++) {
        const lifeGrid = this.life.getCells();
        const index = (row * w + col) * 4; /* 4 for each pixel  */
        const type = lifeGrid[row][col];

        const RGB = [];

        switch (type) {
          case TYPE.ALIVE:
            RGB.push(ALIVE[0]);
            RGB.push(ALIVE[1]);
            RGB.push(ALIVE[2]);
            break;

          case TYPE.DEAD:
            RGB.push(DEAD[0]);
            RGB.push(DEAD[1]);
            RGB.push(DEAD[2]);
            break;

          case TYPE.ZOMBIE:
            RGB.push(ZOMBIE[0]);
            RGB.push(ZOMBIE[1]);
            RGB.push(ZOMBIE[2]);
            break;

          default:
            console.error(`Type: ${type} found in buffer [${row}][${col}]`);
        }

        imageData.data[index + 0] = RGB[0];
        imageData.data[index + 1] = RGB[1];
        imageData.data[index + 2] = RGB[2];

        imageData.data[index + 3] = 0xff; /* alpha channel solid */
      }
    }

    ctx.putImageData(imageData, 0, 0);

    requestAnimationFrame(_ => this.animFrame());
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
        <LifeCanvas width={WIDTH} height={HEIGHT} />
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
