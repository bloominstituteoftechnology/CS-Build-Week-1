import React, { Component } from "react";

class LifeCanvas extends Component {
  componentDidMount() {
    this.draw();
  }

  draw = () => {
    let canvas = this.refs.canvas;
    let context = canvas.getContext("2d");

    for (let x = 0; x < 500; x += 20) {
      for (let y = 0; y < 500; y += 20) {
        context.moveTo(x, 0);
        context.lineTo(x, 500);

        context.moveTo(0, y);
        context.lineTo(500, y);
        context.stroke();
      }
    }
  };

  fillCell = e => {
    let canvas = this.refs.canvas;
    let context = canvas.getContext("2d");
    let boxSize = 20;

    context.fillStyle = "black";

    context.fillRect(
      Math.floor(e.clientX / boxSize) * boxSize,
      Math.floor(e.clientY / boxSize) * boxSize,
      boxSize,
      boxSize
    );
  };

  render() {
    return <canvas ref="canvas" width={400} height={400} />;
  }
}

export default LifeCanvas;
