import React, { Component } from "react";
import Square from "./square";

class GridContainer extends Component {
  state = {
    alive: "",
  }


  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContent('2d');
    ctx.canvas.width = 500;
    
  }


  render() {
    return (
      <div className="grid-container">
        <canvas className="grid" />
      </div>
    );
  }
}

export default GridContainer;
