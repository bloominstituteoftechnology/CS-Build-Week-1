import React, { Component } from 'react';
import CCA from './cca';
import COLORS from './Utilities/Colors';
import './App.css';
import CurrentColors from './Components/CurrentColors/CurrentColors';
import ColorDisplay from './Containers/Colors/ColorDisplay';

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
    requestAnimationFrame(() => {
      this.animFrame();
    });
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
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const status = cells[y][x];

        // Actually update the colors!
        imageData.data[index + 0] = COLORS[status][0];
        imageData.data[index + 1] = COLORS[status][1];
        imageData.data[index + 2] = COLORS[status][2];
        imageData.data[index + 3] = 0xff; // alpha, 0xff = opaque
      }
    }

    // Put the image data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    // Iterate the CCA
    this.cca.step();

    // Request another animation frame
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />;
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
        <CurrentColors />
        <ColorDisplay />
      </div>
    );
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
