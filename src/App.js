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

    // Convert data from life into a bitmap and show it on the canvas
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for(let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {

        let lifeStatus = cells[row][col];
        let color = lifeStatus === 0? 0: 255;

        let index = ((row * width) + col) * 4;

        imageData.data
      }
    }

  }

  /**
   * Render
   */
  render() {
    // TODO
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
