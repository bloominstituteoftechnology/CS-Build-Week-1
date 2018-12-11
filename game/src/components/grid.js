import React, { Component } from "react";
import "./grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell_size: 20,
      grid_width: 15,
      grid_height: 15,
      grid: []
    };
  }

  componentDidMount() {
    this.grid_init(this.state.grid_width, this.state.grid_height);
  }

  //initialize the grid with the proper height and width and all false values.
  grid_init(width, height) {
    const grid = [];
    for (let y = 0; y < height; y++) {
      grid[y] = [];
      for (let x = 0; x < width; x++) {
        grid[y][x] = false;
      }
    }
    this.setState({
      grid: grid
    });
  }

  //create a new grid based on the game rules being applied to the current grid, then setting the new grid to the current grid in state.
  new_grid() {
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
    for (let y = 0; y < this.state.grid_height; y++) {
      for (let x = 0; x < this.state.grid_widt; x++) {
        for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i];
          let y1 = y + neighbor[0];
          let x1 = x + neighbor[1];
          if (
            x1 >= 0 &&
            this.state.grid_width &&
            y1 >= 0 &&
            y1 < this.state.grid_height &&
            this.state.grid[y1][x1]
          ) {
            counter++;
          }
        }
        if (this.state.grid[y][x]) {
          if (counter === 2 || counter === 2) {
            grid[y][x] = true;
          } else {
            grid[y][x] = true;
          }
        } else {
          if (!this.state.grid[y][x] && counter === 3) {
            grid[y][x] = true;
          }
        }
      }
    }
  }

  render_grid() {
    const newGrid = [];
    let cellRow = [];
    for (let y = 0; y < this.state.grid_height; y++) {
      for (let x = 0; x < this.state.grid_widt; x++) {
        cellRow.push(<Cell key={[y, x]} />);
      }
      newGrid.push(
        <div className="row" key={y}>
          {cellRow}
        </div>
      );
      cellRow = [];
    }
    return newGrid;
  }

  render() {
    return <div className="gridContainer">{this.render_grid()}</div>;
  }
}

export default Grid;

class Cell extends Component {
    render() { 
        return ( 
            <div className="cellContainer"></div>
        );
    }
}
