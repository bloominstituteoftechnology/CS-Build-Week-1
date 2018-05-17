import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.continueAnimation = true;

    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  componentWillUnmount() {
    this.continueAnimation = false;
  }

  toggleAnimation = () => {
    this.continueAnimation = !this.continueAnimation;
    if (this.continueAnimation) this.animFrame();
  }

  randomizeCanvas = () => {
    this.life.randomize();
  }

  clearCanvas = () => {
    this.life.clear();
  }

  addGlider = () => {
    this.life.addGlider();
  }

  addGospelGliderGun = () => {
    this.life.addGospelGliderGun();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    // Request another animation frame
    if (this.continueAnimation) {
      requestAnimationFrame(() => {
        this.animFrame();
      });
    }

    // Update life and get cells
    const cells = this.life.getCells();

    // Get canvas framebuffer, a packed RGBA array
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Convert the cell values into white or black for the canvas
    const buffer = imageData.data;
    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        const index = (row * this.props.width + col) * 4;
        const color = cells[row][col] === 0 ? 'ff' : '00';

        buffer[index] = '0x' + color;
        buffer[index + 1] = '0x' + color;
        buffer[index + 2] = '0x' + color;
        buffer[index + 3] = '0xff';
      }
    }

    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Next generation of life
    this.life.step();
  }

  /**
   * Render
   */
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: `${this.props.width}px`, margin: '0 auto' }}>
        <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button onClick={this.toggleAnimation}>Toggle Animation</button>
          <button onClick={this.randomizeCanvas}>Randomize Canvas</button>
          <button onClick={this.clearCanvas}>Clear Canvas</button>
        </div>
        <div>
          <span style={{ fontSize: '12px' }}>Add to canvas: </span>
          <button onClick={this.addGlider}>Glider</button>
          <button onClick={this.addGospelGliderGun}>Gospel Glider Gun</button>
        </div>
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
        <LifeCanvas width={400} height={300} />
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
