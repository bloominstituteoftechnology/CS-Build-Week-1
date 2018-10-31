import React, { Component } from 'react';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: undefined,
      ctx: undefined,
      grid: undefined,
      canvasSize: 580,
      numCells: 58,
      cellDimensions: 10, 
      gridColor: '#dfdfdf'
    };
  }

  drawCanvas = () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const grid = new Array(this.state.numCells);
    let x, y;

    for (let x = 0; x < grid.length; x++) {
      grid[x] = new Array(this.state.numCells);
      for (let y = 0; y < grid[x].length; y++) {
        grid[x][y] = false;
      }
    }

    canvas.width = canvas.height = this.state.canvasSize;
		ctx.strokeStyle = ctx.fillStyle = this.state.gridColor;
		
		for (x = 0.5; x < this.state.numCells * this.state.cellDimensions; x += this.state.cellDimensions) {
		  ctx.moveTo(x, 0);
		  ctx.lineTo(x, this.state.numCells * this.state.cellDimensions);
		}

		for (y = 0.5; y < this.state.numCells * this.state.cellDimensions; y += this.state.cellDimensions) {
		  ctx.moveTo(0, y);
		  ctx.lineTo(this.state.numCells * this.state.cellDimensions, y);
		}
		ctx.stroke();
		
		for (x = 0; x < grid.length; x++) {
			for (y = 0; y < grid[x].length; y++) {
				if (grid[x][y]) {
          ctx.fillRect(x * this.state.cellDimensions + 1, 
            y * this.state.cellDimensions + 1,
            this.state.cellDimensions - 1,
            this.state.cellDimensions - 1);
				}
			}
    }
    
  }

  componentDidMount = () => {
    this.drawCanvas();
  }

  render() {
    return (
      <canvas id="game" className="game"></canvas>
    );
  }
}
