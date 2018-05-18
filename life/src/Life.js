import React, { Component } from 'react';
import './GameOfLife.css';
import RulesOfLife from './RulesOfLife.js';

let singularity = true;

class Life extends Component {
  componentDidMount() {
    requestAnimationFrame(() => this.animFrame());
  }

  god() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let l = imageData.data.length - 4;
    let buffer = imageData;
    let pixel = 0;
    const genNum = (limit) => {
      return Math.floor(Math.random() * limit);
    };

    while (pixel <= l) {
      // if (genNum(100) === 1) {
      //   buffer.data[pixel] = 255;
      //   buffer.data[pixel + 1] = 255;
      //   buffer.data[pixel + 2] = 255;
      //   buffer.data[pixel + 3] = 255;
      //   pixel += 4;
      // }
      buffer.data[pixel] = 255;
      buffer.data[pixel + 1] = 255;
      buffer.data[pixel + 2] = 255;
      buffer.data[pixel + 3] = 255;
      pixel += 4;
    }

    ctx.putImageData(buffer, 0, 0);
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  animFrame() {
    if (singularity) {
      this.god();
      singularity = false;
      requestAnimationFrame(() => {
        this.animFrame();
      });
    } else {
      let canvas = this.refs.canvas;
      let ctx = canvas.getContext('2d');
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let currentBuffer = imageData;

      let nextBuffer = RulesOfLife(currentBuffer);
      ctx.putImageData(nextBuffer, 0, 0);
      requestAnimationFrame(() => {
        this.animFrame();
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Game Of Life</h1><button onClick={() => (singularity = true)}>New Life</button>
        <canvas ref="canvas" width="600" height="600" />
      </div>
    );
  }
}

export default Life;
