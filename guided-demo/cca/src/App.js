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
    this.animFrame();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    let fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let screenBuffer = imageData.data;
    console.log('screen buffer: ', screenBuffer);

    screenBuffer[0] = 0;
    screenBuffer[1] = 0;
    screenBuffer[2] = 0;
  }

  /**
   * Render
   */
  render() {
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
