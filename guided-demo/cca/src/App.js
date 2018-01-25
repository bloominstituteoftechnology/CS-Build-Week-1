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
    this.CCA = new CCA(this.props.width, this.props.height);
    this.CCA.randomize();
    this.stop = false;
    this.lastStamp = null;
    this.corners = true;

    // alternates between corners and no corners as neighbors
    setInterval(() => {
      this.corners = !this.corners
    }, 10000)

  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame((timestamp) => {
      this.animFrame(timestamp)
    })
  }

  componentWillUnmount() {
    this.stop = true;
  }

  /**
   * Handle an animation frame
   */
  animFrame(timestamp) {
    const getIndex = (x, y, width) => {
      return (y * width + x) * 4;
    }

    if (this.lastStamp === null) {
      this.lastStamp = timestamp - 30;
    }

    let canvas = document.getElementById('thecanvas');
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let buffer = imageData.data;
    let cells = this.CCA.getCells()
    for (let y = 0; y < cells.length; y++) {
      for (let x = 0; x < cells[y].length; x++) {
        let c = COLORS[cells[y][x]];
        let i = getIndex(x, y, imageData.width);
        c.forEach((hue, ind) => { buffer[i + ind] = hue })
        buffer[i + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.lastStamp = timestamp
    if (!this.stop) {
      this.CCA.step(this.corners) // use 'true' as argument for corners to be accepted neighbors
      setTimeout(() => {
        requestAnimationFrame((timestamp) => {
          this.animFrame(timestamp)
        })
      }, 20)
    }
  }

  /**
   * Render
   */
  render() {
    return(
      <canvas id='thecanvas' width={this.props.width} height={this.props.height} />
    )
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
        <CCACanvas width={800 * (3/5)} height={450 * (3/5)} />
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