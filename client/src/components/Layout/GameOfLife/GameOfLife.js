import React from "react";
import Grid from "./Grid/Grid";
import Cell from "./Grid/Cell/Cell";

class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.columns = 40;
    this.grid = this.clearGrid();
    this.state = { rows: 30, columns: 40, cells: [] };
  }

  clearGrid() {
    let grid = [];

    for (let y = 0; y < this.rows; y++) {
      grid[y] = [];
      for (let x = 0; x < this.columns; x++) {
        grid[y][x] = false;
      }
    }

    return grid;
  }

  fillCells() {
    let cells = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (this.grid[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  getCell() {
    return {
      x:
        this.gridRef.getBoundingClientRect().left +
        window.pageXOffset -
        document.documentElement.clientLeft,
      y:
        this.gridRef.getBoundingClientRect().top +
        window.pageYOffset -
        document.documentElement.clientTop
    };
  }

  handleClick = event => {
    const offsetX = event.clientX - this.getCell().x;
    const offsetY = event.clientY - this.getCell().y;
    const x = Math.floor(offsetX / 20);
    const y = Math.floor(offsetY / 20);

    if (x >= 0 && x <= this.columns && y >= 0 && y <= this.rows) {
      this.grid[y][x] = !this.grid[y][x];
    }

    this.setState({ cells: this.fillCells() });
  };

  render() {
    return (
      <div>
        <Grid
          onClick={this.handleClick}
          ref={g => {
            this.gridRef = g;
          }}
        >
          {this.state.cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default GameOfLife;
