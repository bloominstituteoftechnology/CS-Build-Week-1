import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0, 0xff, 0], // green
]

class LifeCanvas extends Component {

  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
  }

  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  animFrame() {
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height)

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let buffer = imageData.data;

    for(let row = 0; row < this.props.height; row++) {
      for(let col = 0; col < this.props.width; col++){
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];

        buffer[index + 0] = COLORS[currentNumber][0];
        buffer[index + 1] = COLORS[currentNumber][1];
        buffer[index + 2] = COLORS[currentNumber][2];
        buffer[index + 3] = 0xff;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();
    requestAnimationFrame(() => {this.animFrame()});
  }

  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

class LifeApp extends Component {

  render() {
    return (
      <div>
        <LifeCanvas width={400} height={300} />
      </div>
    )
  }
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <LifeApp />
      </div>
    );
  }
}

export default App;
