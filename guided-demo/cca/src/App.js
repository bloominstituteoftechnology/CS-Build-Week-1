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
    this.cca.randomize(); 
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()} ); 
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const { width, height } = this.props
    const cells = this.cca.getCells()
    let canvas = this.refs.canvas;    
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0,0,width,height);
    //[r1,b1,g1,r2,b2,g2,r3,b3,g3]
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        //get index into image data
        let index = (y * width + x) * 4;
        let status = cells[y][x];
        imageData.data[index + 0] = COLORS[status][0]; //red
        imageData.data[index + 1] = COLORS[status][1]; //blue
        imageData.data[index + 2] = COLORS[status][2]; //green
        imageData.data[index + 3] = 0xff;//alpha 0xff = opaque
      }
    }
    ctx.putImageData(imageData, 0, 0);
    this.step();
    
    requestAnimationFrame(() => { this.animFrame(); });
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