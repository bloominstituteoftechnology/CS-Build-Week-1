import React from 'react';
import ReactTimeout from 'react-timeout';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isRunning: false,
      iterationCount: 0
    };

    this.startSimulation = e => {
      e.preventDefault();
      if (this.state.isRunning) { return; }
      this.setState({ isRunning: true }, () => this.createNextIteration());

    };

    this.stopSimulation = e => {
      e.preventDefault();
      if (!this.state.isRunning) { return; }
      clearTimeout(this.timeout);
      this.setState({ isRunning: false });
    };

    this.advanceOneIteration = e => {
      e.preventDefault();
      if (this.state.isRunning) { return; }
      this.createNextIteration();
    };

    this.createNextIteration = () => {
      let grid = this.state.grid.map(row => row.slice());
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          let count = this.countNeighbors(i, j);
          if (grid[i][j]) {
            if (count < 2 || count > 3) {
              grid[i][j] = false;
            }
          } else {
            if (count === 3) {
              grid[i][j] = true;
            }
          }
        }
      }
      this.setState({ grid: grid,
                      iterationCount: this.state.iterationCount + 1 });

      if (this.state.isRunning) {
        this.timeout = setTimeout(() => {
          this.createNextIteration();
        }, 500);
      }
    };

    this.countNeighbors = (rowIndex, cellIndex) => {
      const neighbors = [
        [rowIndex - 1, cellIndex - 1],
        [rowIndex - 1, cellIndex],
        [rowIndex - 1, cellIndex + 1],
        [rowIndex, cellIndex - 1],
        [rowIndex, cellIndex + 1],
        [rowIndex + 1, cellIndex - 1],
        [rowIndex + 1, cellIndex],
        [rowIndex + 1, cellIndex + 1]
      ];

      let count = 0;

      for (let i = 0; i < neighbors.length; i++) {
        if ((neighbors[i][0] >= 0 && neighbors[i][0] <= 14) &&
            (neighbors[i][1] >= 0 && neighbors[i][1] <= 14)) {
               const position = neighbors[i];
               if (this.state.grid[position[0]][position[1]]) {
                 count += 1;
               }
             }
      }
      return count;
    };

    this.toggleCell = (rowIndex, cellIndex) => {
      let grid = this.state.grid;
      grid[rowIndex][cellIndex] = !grid[rowIndex][cellIndex];
      this.setState({ grid: grid });
    };

    this.resetGrid = e => {
      e.preventDefault();
      window.clearTimeout(this.timeout);
      let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
      this.setState({ grid: grid, isRunning: false, iterationCount: 0 });
    };
  }

  componentDidMount() {
    let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
    this.setState({ grid: grid });
  }

  render() {
    return (
      <div className="container">
        <div className="grid-container">
          {this.state.grid.map((row, rowIndex) => {
            return <div key={rowIndex}
                        className="row">{row.map((cell, cellIndex) => {
              return <div key={cellIndex}
                          className={cell ? "black-cell" : "white-cell"}
                          onClick={!this.state.isRunning ?
                                   () => this.toggleCell(rowIndex, cellIndex) :
                                   null}
                     >{cell}</div>;
            })}</div>;
          })}
        </div>
        <button onClick={this.startSimulation}>start</button>
        <button onClick={this.stopSimulation}>stop</button>
        <button onClick={this.advanceOneIteration}>next</button>
        <button onClick={this.resetGrid}>reset</button>
        <div className="slider-container">
          <Slider min={50}
                  max={1000}/>
        </div>
        <div>{this.state.iterationCount}</div>
      </div>
    );
  }
}

export default ReactTimeout(App);
