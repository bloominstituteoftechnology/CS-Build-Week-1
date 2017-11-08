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

    this.life = new Life(this.props.width, this.props.height);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => { this.animFrame(); });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let width = this.props.width;
    let height = this.props.height;

    let cells = this.life.getCells();
    // Convert data from life into a bitmap and show it on the canvas
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for(let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {

        let lifeStatus = cells[row][col];
        let color = lifeStatus === 0? 0: 255;

        let index = ((row * width) + col) * 4;

        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
        imageData.data[index + 3] = 0xff; //opaque
      }
    }
    // Draw it back
    ctx.putImageData(imageData, 0, 0);

    // Next gen
    this.life.step();

    //After render, draw another frame
    if(!this.stopRequested) {
      requestAnimationFrame(() => { this.animFrame(); });
    }

  }

  start() {
    this.stopRequested = false;
    requestAnimationFrame(() => { this.animFrame(); });
  }

  step() {
    this.stopRequested = true;
    requestAnimationFrame(() => { this.animFrame(); });
  }
  /**
   * Render
   */
  render() {
    // TODO
    return(
      <div>
        <div>
          <button onClick={() =>{ this.life.randomize(); }}>Randomize</button>
          <button onClick={() => { this.life.clear(); }}>Clear</button>
          <button onClick={() => { this.stopRequested = true; }}>Stop</button>
          <button onClick={() => { this.life.start(); }}>Start</button> 
          <button onClick={() => { this.life.step(); }}>Step</button> 
        </div>
        <canvas ref="canvas" onClick={(ev) => {console.log(ev.clientX, ev.clientY);}} width={this.props.width} height={this.props.height}/>       
      </div>
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
