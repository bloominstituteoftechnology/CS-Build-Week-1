import React, { Component } from 'react';
import Life from './life';
import './App.css';

const canvasWidth = 800;
const canvasHeight = 600;

const COLORS = [
  [0, 0, 0],
  [0xFF, 0xFF, 0xFF]
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
    //
    // TODO: !!!! IMPLEMENT ME !!!!
    //
    let width = this.props.width;
    let height = this.props.height;

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2D');

    this.life = new Life(300, 300);

    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, width, height);
    // ctx.fill();
    
    // Request another animation frame

    requestAnimationFrame(() => {this.animFrame()});

    // Update life and get cells
    let lifeCells = this.life.getCells();
    // Get canvas framebuffer, a packed RGBA array

    // Convert the cell values into white or black for the canvas

    // Put the new image data back on the canvas

    // Next generation of life
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
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
