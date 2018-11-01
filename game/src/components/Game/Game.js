import React, { Component } from 'react';
import Cell from './Cell';

export default class Game extends Component {
  constructor(props) {
    super(props);
    
    this.CANVAS_SIZE = 580;
    this.NUM_CELLS = 58;
    this.CELL_SIZE = 10;
    this.GRID_COLOR = '#dfdfdf';

    this.state = {
      grid: this.getGrid()
    };
  }

  drawCanvas = () => {
    const canvas = this.refs.game;
    const ctx = this.refs.game.getContext('2d');
    const grid = this.state.grid.slice();

    if (canvas) {
      canvas.width = canvas.height = this.CANVAS_SIZE;
      ctx.strokeStyle = ctx.fillStyle = this.GRID_COLOR;
      
      for (let x = 0.5; x < this.NUM_CELLS * this.CELL_SIZE; x += this.CELL_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.NUM_CELLS * this.CELL_SIZE);
      }

      for (let y = 0.5; y < this.NUM_CELLS * this.CELL_SIZE; y += this.CELL_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(this.NUM_CELLS * this.CELL_SIZE, y);
      }
      ctx.stroke();
      
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
          const cell = grid[x][y];
          if (cell.isAlive) {
            ctx.fillRect(x * this.CELL_SIZE + 1, 
              y * this.CELL_SIZE + 1,
              this.CELL_SIZE - 1,
              this.CELL_SIZE - 1);
          }
        }
      }

    }
  }

  randomize = () => {
    let grid = this.state.grid.slice();
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        let cell = new Cell();
        if (Math.random() < 0.44) {
          cell.create();
        } 
        grid[x][y] = cell;
      }
    }
    this.setState({grid: grid});
    this.drawCanvas();
    console.log('randomized');
  }

  getGrid = () => {
    const grid = [];

    for (let x = 0; x < this.NUM_CELLS; x++) {
      grid[x] = [];
      for (let y = 0; y < this.NUM_CELLS; y++) {
        grid[x][y] = false;
      }
    }

    return grid;
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('componentWillUpdate');
    this.drawCanvas();
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    this.drawCanvas();
    this.randomize();
  }

  render() {
    return (
      <canvas ref="game" className="game"></canvas>
    );
  }
}
