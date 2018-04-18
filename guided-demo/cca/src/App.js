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
    this.cca = new CCA (props.width, props.height);
    this.cca.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animeFrame()});
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const width = this.props.width;
    const height = this.props.height;
    let cells = this.cca.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0,0, width, height);
    //
    for (let y = 0; y< height; y++) {
      for (let x=0; x< width; x++){
        //get the index into the image data
        const index = (y* width + x)*4;
        const status = cells[y][x];

        //update the colors
        imageData.data[index + 0] = COLORS[status][0];//red
        imageData.data[index + 1] = COLORS[status][1];//green
        imageData.data[index + 2] = COLORS[status][2];//blue
        imageData.data[index + 3] = oxff; //alpha, 0xff=opaque
      }
    }
    // put image data back on the canvas
    ctx.putImageData(IMAGEdATA, 0,0);
    //Iterate the cca
    THIS.CCA.STEP();
    //request another animation frame
    requestAnimationFrame(() => {this.animeFrame});
  }

  /**
   * Render
   */
  render() {
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