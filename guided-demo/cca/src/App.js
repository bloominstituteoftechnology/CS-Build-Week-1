import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
]

/**
 * CCA canvas
 */
class CCACanvas extends Component {

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
    this.animFrame(); //TODO this should animate
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /////EXPERIMENT//////


    // // Here is the screen buffer array we can manipulate

    // let screenBuffer = imageData.data;
    // console.log("scfreen buffer: ", screenBuffer);

    // imageData.data[0] = 0;
    // imageData.data[1] = 0;
    // imageData.data[2] = 0;
    // console.log("after change scfreen buffer: ", screenBuffer);

    ///// EXP END///////

    let buffer = imageData.data;

    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) * 4;

      let greyScale = Math.floor(Math.random() * 255);

      buffer[index + 0] = greyScale; // RED: full intensity
      buffer[index + 1] = greyScale; // GREEN: zero intensity
      buffer[index + 2] = greyScale; // BLUE: zero intensity
      buffer[index + 3] = 0xff; // APLHA: fully opaque
      }
    }

    ctx.putImageData(imageData, 0, 0);

  }

  /**
   * Render
   */
  render() {
    //my code
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} /> 
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={400} height={300} />
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
        <CCAApp />
      </div>
    );
  }
}

export default App;