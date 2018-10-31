import React from 'react';
import ReactTimeout from 'react-timeout';
import Rules from './Rules';
import Slider from 'rc-slider';
import presets from './presets';
import 'rc-slider/assets/index.css';
import './App.css';

const oneGridSide = 15;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isRunning: false,
      iterationCount: 0,
      sliderValue: -550,
      refreshRate: 550
    };

    this.makeEmptyGrid = () => {
      return Array(oneGridSide).fill(null).map(_ =>
        Array(oneGridSide).fill(false)
      );
    };

    this.startSimulation = e => {
      e.preventDefault();
      if (this.state.isRunning) { return; }
      this.setState({ isRunning: true },
        () => this.simulationLoop());
    };

    this.stopSimulation = e => {
      e.preventDefault();
      if (!this.state.isRunning) { return; }
      clearTimeout(this.timeout);
      this.setState({ isRunning: false });
    };

    this.simulationLoop = () => {
      this.createNextIteration();
      this.timeout = setTimeout(() => {
        this.simulationLoop();
      }, this.state.refreshRate);
    };

    this.advanceOneIteration = e => {
      e.preventDefault();
      if (this.state.isRunning || this.state.iterationCount === 0) { return; }
      this.createNextIteration();
    };

    this.createNextIteration = () => {
      let grid = this.state.grid.map(row => row.slice());
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          let count = this.countNeighbors(i, j);
          if (grid[i][j] && (count < 2 || count > 3)) {
            grid[i][j] = false;
          } else if (count === 3) {
            grid[i][j] = true;
          }
        }
      }
      this.setState({ grid: grid,
                      iterationCount: this.state.iterationCount + 1 });
    };

    this.isWithinGrid = (rowIndex, cellIndex) => {
      return ((rowIndex >= 0 && rowIndex <= oneGridSide - 1) &&
              (cellIndex >= 0 && cellIndex <= oneGridSide - 1));
    };

    this.findNeighbors = (rowIndex, cellIndex) => {
      return [
        [rowIndex - 1, cellIndex - 1],
        [rowIndex - 1, cellIndex],
        [rowIndex - 1, cellIndex + 1],
        [rowIndex, cellIndex - 1],
        [rowIndex, cellIndex + 1],
        [rowIndex + 1, cellIndex - 1],
        [rowIndex + 1, cellIndex],
        [rowIndex + 1, cellIndex + 1]
      ];
    };

    this.countNeighbors = (rowIndex, cellIndex) => {
      const neighbors = this.findNeighbors(rowIndex, cellIndex);
      let count = 0;
      for (let i = 0; i < neighbors.length; i++) {
        if (this.isWithinGrid(neighbors[i][0], neighbors[i][1])) {
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
      clearTimeout(this.timeout);
      this.setState({ grid: this.makeEmptyGrid(),
                      isRunning: false,
                      iterationCount: 0,
                      sliderValue: -550,
                      refreshRate: 550 });
    };

    this.onSliderChange = (sliderValue) => {
      this.setState({ sliderValue });
    };

    this.onAfterChange = (value) => {
      this.setState({ refreshRate: value * -1 });
    };

    this.loadPreset = (preset) => {
      clearTimeout(this.timeout);
      let grid = this.makeEmptyGrid();
      const presetToLoad = presets[preset];
      presetToLoad.forEach(position => {
        grid[position[0]][position[1]] = true;
      });
      this.setState({ grid: grid,
                      isRunning: false,
                      iterationCount: 0,
                      sliderValue: -550,
                      refreshRate: 550 });
    };
  }

  componentDidMount() {
    this.setState({ grid: this.makeEmptyGrid() });
  }

  render() {
    return (
      <div className="container">
        <h1>Conway's Game of Life</h1>
        <div className="grid-controls-presets-container">
          <div className="grid-slider-iteration-count-container">
            <div className="grid-container">
              {this.state.grid.map((row, rowIndex) => {
                return <div key={rowIndex}
                            className="row">{row.map((cell, cellIndex) => {
                  return <div key={cellIndex}
                              className={cell ? "living-cell" : "dead-cell"}
                              onClick={!this.state.isRunning ?
                                       () => this.toggleCell(rowIndex, cellIndex) :
                                       null}
                         >{cell}</div>;
                })}</div>;
              })}
            </div>
            <div className="slider-container">
              <Slider min={-1000}
                      max={-100}
                      value={this.state.sliderValue}
                      onChange={this.onSliderChange}
                      onAfterChange={this.onAfterChange}
                      trackStyle={{ backgroundColor: 'black', borderRadius: 0, height: 5 }}
                      handleStyle={{
                        border: 'none',
                        borderColor: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        // height: 28,
                        // width: 28,
                        // marginLeft: -14,
                        // marginTop: -9,
                        backgroundColor: 'black',
                      }}
                      railStyle={{ backgroundColor: 'gray', borderRadius: 0, height: 5 }}/>
            </div>
            <div className="iteration-count">iterations: {this.state.iterationCount}</div>
          </div>
          <div className="controls-container">
            <button onClick={this.startSimulation}>start</button>
            <button onClick={this.stopSimulation}>stop</button>
            <button onClick={this.advanceOneIteration}>next</button>
            <button onClick={this.resetGrid}>reset</button>
          </div>
          <div className="presets-container">
            <button onClick={() => this.loadPreset("small exploder")}>
              small exploder
            </button>
            <button onClick={() => this.loadPreset("exploder")}>
              exploder
            </button>
            <button onClick={() => this.loadPreset("nine cell row")}>
              nine cell row
            </button>
            <button onClick={() => this.loadPreset("tumbler")}>
              tumbler
            </button>
          </div>
        </div>
        {/* <Rules /> */}
      </div>
    );
  }
}

export default ReactTimeout(App);
