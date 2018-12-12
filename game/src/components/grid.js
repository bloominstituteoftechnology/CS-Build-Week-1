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
    let height = this.state.grid_height_cells * size;
    let width = this.state.grid_width_cells * size;

    //set grid array size and set all values to false
    this.grid_init(this.state.grid_width_cells, this.state.grid_height_cells);

    //render the canvas
    let canvas = this.refs.canvas;
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
    let canvas =  this.refs.canvas;
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
            ctx.fillRect(
              y * this.state.cell_size,
              x * this.state.cell_size,
              this.state.cell_size,
              this.state.cell_size
            );
          } else {
            grid[y][x] = false;
            ctx.clearRect(
              y * this.state.cell_size,
              x * this.state.cell_size,
              this.state.cell_size,
              this.state.cell_size
            );
          }
        } else {
          if (!this.state.grid[y][x] && counter === 3) {
            grid[y][x] = true;
            ctx.fillStyle = "green";
            ctx.fillRect(
              y * this.state.cell_size,
              x * this.state.cell_size,
              this.state.cell_size,
              this.state.cell_size
            );
          }
        }
      }
    }
  }

  get_cursor = event => {
    if (this.props.game_running) {
      return;
    }
    let canvas = this.refs.canvas;
    let top = canvas.offsetTop;
    let left = canvas.offsetLeft;
    let x = event.clientX - left;
    let y = event.clientY - top;
    let cellSize = this.state.cell_size;
    let currentsquareX = Math.floor(x / cellSize);
    let currentsquareY = Math.floor(y / cellSize);
    let grid = this.state.grid.slice(0);
    if(grid[currentsquareY][currentsquareX] === true) {
      grid[currentsquareY][currentsquareX] = false;
    } else {
      grid[currentsquareY][currentsquareX] = true;
    }
    this.setState({ grid }, () => this.grid_update_draw(currentsquareY, currentsquareX, cellSize));
  };

  grid_update_draw(currentsquareY, currentsquareX, cellSize) {
    let canvas = this.refs.canvas.getContext('2d');
    if(this.state.grid[currentsquareY][currentsquareX] === true) {
      canvas.fillStyle = 'green';
      canvas.fillRect(
        currentsquareX * cellSize + 1,
        currentsquareY * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    } else {
      canvas.fillStyle = 'white';
      canvas.fillRect(
        currentsquareX * cellSize + 1,
        currentsquareY * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    }
  }

  render() {
    return (
      <div className="gridContainer">
        <canvas
          id="canvas"
          ref = "canvas"
          width={this.state.grid_width_cells * this.state.cell_size}
          height={this.state.grid_height_cells * this.state.cell_size}
          onClick={this.get_cursor}
        />
      </div>
    );
  }
}
export default Grid;
