import React, { Component, Fragment } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */
const canvasWidth = 500;
const canvasHeight = 300;

class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = { animating: false };

    this.life = new Life(canvasWidth, canvasHeight);
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
    //
    // !!!! IMPLEMENT ME !!!!
    //
    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();
    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        const index = (height * canvasWidth + width) * 4;

        const alive = cells[height][width];
        screenBuffer[index + 3] = alive ? 0 : 255;
      }
    }

    // for (let i = 0; i < screenBuffer.length; i++) {
    //   if ((i + 1) % 4 === 0) {
    //     screenBuffer[i] = 255;
    //   }
    // }
    ctx.putImageData(imageData, 0, 0);
    // ctx.imageSmoothingEnabled = false;
    // ctx.drawImage(canvas, 0, 0, 7 * canvas.width, 7 * canvas.height);
    this.life.step();

    requestAnimationFrame(() => {
      if (this.state.animating) {
        this.animFrame();
      }
    });
  }

  /**
   * Render
   */
  render() {
    return (
      <div class="main" style={{ width: canvasWidth }}>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
        <button
          onClick={() => {
            this.setState({ animating: !this.state.animating });
            this.animFrame();
          }}
        >
          {this.state.animating ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => this.restartGame()}>Restart Game</button>
      </div>
    );
  }
  restartGame = () => {
    this.setState({ animating: false });
    this.life = new Life(canvasWidth, canvasHeight);
    this.life.randomize();
    this.animFrame();
  };
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
      <div class="lifeCanvas">
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
