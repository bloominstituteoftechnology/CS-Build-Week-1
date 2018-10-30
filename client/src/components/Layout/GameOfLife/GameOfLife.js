import React from "react";
import Grid from "./Grid/Grid";
import Cell from "./Grid/Cell/Cell";

class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.columns = 40;
    this.grid = this.clearGrid();
    this.state = {
      rows: 30,
      columns: 40,
      cells: [],
      speed: 100,
      isPlaying: false
    };
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

  startGame = () => {
    this.setState({ isPlaying: true });
    this.nextGeneration();
  };
  stopGame = () => {
    this.setState({ isPlaying: false });
    if (this.speedHandler) {
      window.clearTimeout(this.speedHandler);
      this.speedHandler = null;
    }
  };

  handleSpeed = event => {
    this.setState({ speed: event.target.value });
  };

  nextGeneration() {
    let generation = this.clearGrid();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        let neighbors = this.applyRules(this.grid, x, y);
        if (this.grid[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            generation[y][x] = true;
          } else {
            generation[y][x] = false;
          }
        } else {
          if (!this.grid[y][x] && neighbors === 3) {
            generation[y][x] = true;
          }
        }
      }
    }

    this.grid = generation;
    this.setState({ cells: this.fillCells() });

    this.speedHandler = window.setTimeout(() => {
      this.nextGeneration();
    }, this.state.speed);
  }

  applyRules(grid, x, y) {
    let neighbors = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      let y1 = y + direction[0];
      let x1 = x + direction[1];

      if (
        x1 >= 0 &&
        x1 < this.columns &&
        y1 >= 0 &&
        y1 < this.rows &&
        grid[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  }

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
        <div>
          Speed: <input value={this.state.speed} onChange={this.handleSpeed} />{" "}
          milliseconds
          {this.state.isPlaying ? (
            <button onClick={this.stopGame}>Stop</button>
          ) : (
            <button onClick={this.startGame}>Start</button>
          )}
        </div>
      </div>
    );
  }
}

export default GameOfLife;
