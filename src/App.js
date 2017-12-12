import React, { Component } from 'react';
import Life from './life';
import './App.css';

class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proceed: true
    }
    this.startStop.bind(this);
    this.randomize.bind(this);
    this.clear.bind(this);
    this.addGlider.bind(this);
    this.addGun.bind(this);
  }

  startStop() {
    this.setState({ proceed: !this.state.proceed });
  }

  randomize() {
    this.life.randomize();
  }

  clear() {
    this.life.clear();
  }

  addGlider() {
    this.life.addGlider();
  }

  addGun() {
    this.life.addGun();
  }

  componentDidMount() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    this.life = new Life(this.props.width, this.props.height);
    this.life.clear();
    this.life.randomize();
    requestAnimationFrame(this.animFrame.bind(this));
  }

  animFrame() {
    if (this.state.proceed) {
      let canvas = this.refs.canvas;
      let ctx = canvas.getContext('2d');
      let imageData = ctx.getImageData(0, 0, this.props.width, this.props.height);
      let pixels = imageData.data;
      let width = this.props.width;
      const drawPixel = (x, y, r, g, b) => {
        let index = ((y * width) + x) * 4;
        pixels[index + 0] = r;
        pixels[index + 1] = g;
        pixels[index + 2] = b;
        pixels[index + 3] = 0xff;
      }
      const cells = this.life.getCells();
      cells.forEach((row, y) => row.forEach((cell, x) => {
        cell ? drawPixel(x, y, 255, 255, 255) : drawPixel(x, y, 0, 0, 0);
      }));
      ctx.putImageData(imageData, 0, 0);
      this.life.step();
    }
    requestAnimationFrame(this.animFrame.bind(this));
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
        <div>
          <button onClick={() => this.startStop()}>{this.state.proceed ? "Stop" : "Start"}</button>
          <button onClick={() => this.randomize()}>Randomize</button>
          <button onClick={() => this.clear()}>Clear</button>
          <button onClick={() => this.addGlider()}>Glider</button>
          <button onClick={() => this.addGun()}>Gun</button>
        </div>
    </div>
    )
  }
}

class LifeApp extends Component {
  render() {
    return (
      <div>
        <LifeCanvas width={400} height={300}/>
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
