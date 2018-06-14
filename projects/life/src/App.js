import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0xff, 0xff, 0xff],
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

    this.life = new Life(props.width, props.height);
    this.life.randomize();
    this.lifeIsRunning = true;                         // Used in pausing the game
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Toggle animation on and off
   */
  toggleAnimation = () => {
    if (this.lifeIsRunning) this.lifeIsRunning = false;
    else {
      this.lifeIsRunning = true;
      requestAnimationFrame(() => {this.animFrame()});
    }
  }
  
  /**
   * Start a new game
   */
  newGame = () => {
    this.lifeIsRunning = true;
    this.life.randomize();
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Clear the game canvas
   */
  clearGame = () => {
    this.lifeIsRunning = false;
    this.life.clear();
    // requestAnimationFrame(() => {this.animFrame()});
  }
  
  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();

    let screenBuffer = imageData.data;

    for (let height = 0; height < canvas.height; height++) {
      for (let width = 0; width < canvas.width; width++) {
        let index = (height * canvas.width + width) * 4;
        // Update life and get cells
        let lifeStatus = cells[height][width];

        // Get canvas framebuffer, a packed RGBA array
        // Convert the cell values into white or black for the canvas
        screenBuffer[index + 0] = COLORS[lifeStatus][0];
        screenBuffer[index + 1] = COLORS[lifeStatus][1];
        screenBuffer[index + 2] = COLORS[lifeStatus][2];
        screenBuffer[index + 3] = 255;
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Check to see if the game has been paused
    if (this.lifeIsRunning) {
      // Next generation of life
      this.life.step();
      requestAnimationFrame(() => {this.animFrame()});
    }

    // Request another animation frame
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height} /><br />
        <button onClick={this.newGame}>New Life</button>&nbsp;
        <button onClick={this.toggleAnimation}>Start / Stop</button>&nbsp;
        <button onClick={this.clearGame}>Clear Game</button>
      </div>
    )
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
        <LifeCanvas width={400} height={300}/>
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
