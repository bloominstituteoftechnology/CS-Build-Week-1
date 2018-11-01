import React, { Component } from 'react';
//import Cell from './Cell';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.CANVAS_SIZE = 580;
    this.CELL_SIZE = 10;
    this.GRID_COLOR = '#dfdfdf';

    this.state = {
      buttonCommand: null
    };
  }

  drawCanvas = () => {
    const canvas = this.refs.game;
    const ctx = this.refs.game.getContext('2d');
    const grid = this.props.grid.slice();
    const lineOffset = 0.5;
    const fillOffset = 1;

    canvas.width = canvas.height = this.CANVAS_SIZE;
    ctx.strokeStyle = ctx.fillStyle = this.GRID_COLOR;
    
    for (let x = lineOffset; x < this.props.numCells * this.CELL_SIZE; x += this.CELL_SIZE) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.props.numCells * this.CELL_SIZE);
    }

    for (let y = lineOffset; y < this.props.numCells * this.CELL_SIZE; y += this.CELL_SIZE) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.props.numCells * this.CELL_SIZE, y);
    }
    ctx.stroke();
    
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const cell = grid[x][y];
        if (cell.isAlive) {
          ctx.fillRect(x * this.CELL_SIZE + fillOffset, 
            y * this.CELL_SIZE + fillOffset,
            this.CELL_SIZE - fillOffset,
            this.CELL_SIZE - fillOffset);
        }
      }
    }

  }

  componentDidUpdate = prevProps => {
    this.drawCanvas();
  }

  componentDidMount = () => {
    this.drawCanvas();
    this.props.randomize();
  }

  render() {
    return (
      <canvas ref="game" className="game"></canvas>
    );
  }
}
