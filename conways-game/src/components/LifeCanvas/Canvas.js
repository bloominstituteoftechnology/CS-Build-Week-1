import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import Cell from "./Cell";
class Canvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      cells: [],
      animPlay: false
    }
  }

  /**
   * After the component has mounted
   */
  componentDidMount() {
    this.gridSize = 20;
    // Request initial animation frame
    this.onAnimFrame();
    this.setState({
      cells: Array.apply(null, Array(this.gridSize*this.gridSize)).map(Number.prototype.valueOf,0),
      animPlay: this.props.playActive
    }, () => {
      this.canvas = this.refs.canvas;
      this.squareLen = this.canvas.width / this.gridSize;
      this.ctx = this.canvas.getContext("2d");
      this.initialDrawing();
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.playActive !== this.props.playActive) {
      this.setState({
        animPlay: this.props.playActive
      }, this.onAnimFrame);
      return true
    }
    else {
      return false;
    }
  }

  initialDrawing() {
    const { cells } = this.state;
    this.ctx.beginPath();
    for (let i = 0; i < Math.sqrt(cells.length); i++) {
      for (let j = 0; j < Math.sqrt(cells.length); j++) {
        let row = i;
        let column = j;
        let cell = new Cell(this.ctx, column * this.squareLen, row * this.squareLen, this.squareLen);
        cell.draw();
      }
    }
  }
  /**
   * When the component is about to unmount
   */

  componentWillUnmount() {
    // Stop animating
  }

  /**
   * Called every frame of animation
   */
  onAnimFrame(timestamp) {
    // If desired, request another anim frame for later
    if (this.props.playActive) {
      requestAnimationFrame(() => {
        this.onAnimFrame();
      });
    }

    // TODO animate stuff
  }

  /**
   * Render the canvas
   */
  render() {
    return (
        <canvas width="500" height="500" ref="canvas" />
    );
  }
}

export default Canvas;
