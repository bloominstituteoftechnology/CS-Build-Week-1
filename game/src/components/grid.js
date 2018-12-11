import React, { Component } from "react";
import Cell from "./cell";
import "./grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell_size: 20,
      grid_width_cells: 25,
      grid_height_cells: 25,
      grid: []
    };
  }
  componentDidMount() {
    let size = this.state.cell_size;
    let height = this.state.grid_height_cells*size;
    let width = this.state.grid_width_cells*size;
    
    //set grid array size and set all values to false
    this.grid_init(this.state.grid_width_cells, this.state.grid_height_cells);

    //render the canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    for (let y = size; y < height; y += size) {
      ctx.moveTo(0, y);
      ctx.lineTo(height, y);
    }

    for (let x = size; x < width; x += size) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, width);
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  //initialize the grid with the proper height and width and all false values.
  grid_init(width, height) {
    const grid = [];
    for (let y = 0; y < height; y++) {
      grid[y] = [];
      for (let x = 0; x < width; x++) {
        grid[y][x] = new Cell({
            is_alive: false
        });
      }
    }
    this.setState({
      grid: grid
    });
  }
  //create a new grid based on the game rules being applied to the current grid, then setting the new grid to the current grid in state.
  new_grid() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    const grid = this.state.grid;
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];
    let counter = 0;
    for (let y = 0; y < this.state.grid_height_cells; y++) {
      for (let x = 0; x < this.state.grid_width_cells; x++) {
        for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i];
          let y1 = y + neighbor[0];
          let x1 = x + neighbor[1];
          if (
            x1 >= 0 &&
            this.state.grid_width_cells &&
            y1 >= 0 &&
            y1 < this.state.grid_height_cells &&
            this.state.grid[y1][x1]
          ) {
            counter++;
          }
        }
        if (this.state.grid[y][x]) {
          if (counter === 2 || counter === 3) {
            grid[y][x] = true;
            ctx.fillStyle = "green";
            ctx.fillRect(y*this.state.cell_size, x*this.state.cell_size, this.state.cell_size, this.state.cell_size);
          } else {
            grid[y][x] = false;
            ctx.clearRect(y*this.state.cell_size, x*this.state.cell_size, this.state.cell_size, this.state.cell_size);
          }
        } else {
          if (!this.state.grid[y][x] && counter === 3) {
            grid[y][x] = true;
            ctx.fillStyle = "green";
            ctx.fillRect(y*this.state.cell_size, x*this.state.cell_size, this.state.cell_size, this.state.cell_size);
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="gridContainer">
        <canvas id="canvas" width={(this.state.grid_width_cells*this.state.cell_size)} height={(this.state.grid_height_cells*this.state.cell_size)} />
      </div>
    );
  }
}
export default Grid;
