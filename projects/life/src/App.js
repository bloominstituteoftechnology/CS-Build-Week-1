import React, { Component } from 'react';
import Life from './life';
import './App.css';

// const COLORS = [
//   [0, 0, 0],
//   [0x8f, 0, 0x5f],
//   [0x5f, 0, 0x8f],
//   [0, 0, 0xff],
//   [0, 0x5f, 0x7f],
//   [0x5f, 0x8f, 0x7f],
//   [0x8f, 0xff, 0x7f],
//   [0xff, 0x5f, 0x7f],
// ];
class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

  componentDidMount() {
    requestAnimationFrame(() => { this.animFrame() });
  }

  // Handle an animation frame
  animFrame() {
    let canvas = this.refs.canvas;
    let context = canvas.getContext('2d');
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();
    let screenBuffer = imageData.data;

    for (let height = 0; height < this.props.height; height++) {
      for (let width = 0; width < this.props.width; width++) {
        let index = (height * this.props.height + width) * 4;
        let ccaStatus = cells[height][width];
        let color = ccaStatus === 0 ? 0x00 : 0xff;

        screenBuffer[index + 0] = color; // R
        screenBuffer[index + 1] = color; // G
        screenBuffer[index + 2] = color; // B
        screenBuffer[index + 3] = 0xff; // A
      }
    }

    context.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(() => { this.animFrame() });
  }

  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />;
  }
}
class LifeApp extends Component {
  render() {
    return (
      <div>
        <LifeCanvas width={400} height={300} />
      </div>
    );
  }
}
class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>The Game of Life</h1>
        <LifeApp />
      </div>
    );
  }
}

export default App;
