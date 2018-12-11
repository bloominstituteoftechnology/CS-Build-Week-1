import React, { Component } from "react";
import Square from "./square";

class GridContainer extends Component {
  state = {
    alive: "",
  }


  componentDidMount() {
    const w = 500;
    const h = 500;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    for(let x=0; x<=w; x+=15){
      for(let y=0;y<=h; y+=15){
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h)
        ctx.stroke();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

      }
    }
  }


  render() {
    return (
      <div className="grid-container">
        <canvas className="grid" ref="canvas"/>
      </div>
    );
  }
}

export default GridContainer;
