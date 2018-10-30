import React from "react";

class Cell extends React.Component {
  state = {
    currentState: "dead",
    isClickable: true
  };

  draw = () => {
    const { ctx, i, j, w, h, size } = this.props;
    ctx.beginPath();
    let x = i * size;
    let y = j * size;
    if (x === y) {
      ctx.fillStyle = "black";
      ctx.fill();
    }
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };

  render() {
    this.draw();
    return null;
  }
}

export default Cell;
