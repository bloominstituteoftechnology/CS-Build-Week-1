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

    this.cca = new CCA(props.width, props.height);
    this.cca = randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const cells = this.cca.getCells();
    const height = this.props.height;
    const width = this.props.width;
    const canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const color = COLORS[state];
        const index = (y * width + x) * 4;

        imageData.data[index + 0] = color[0]
        imageData.data[index + 1] = color[1]
        imageData.data[index + 2] = color[2]
        imageData.data[index + 3] = 0xff
      }
    }
    ctx.putImageData(imageData, 0, 0);
    this.cca.step();
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height}>
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