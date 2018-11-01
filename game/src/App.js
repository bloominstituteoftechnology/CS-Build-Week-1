import React, { Component } from 'react';
import Game from './components/Game';
import Cell from './components/Game/Cell';
import Controls from './components/Controls';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop, faStepForward, faEraser, faQuestion } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add([faPlay, faStop, faStepForward, faEraser, faQuestion])

class App extends Component {
  constructor(props) {
    super(props);
    this.NUM_CELLS = 58;
    this.state = {
      timer: undefined,
      generationNumber: 0,
      grid: this.createGrid()
    };
  }

  createGrid = () => {
    const grid = [];

    for (let x = 0; x < this.NUM_CELLS; x++) {
      grid[x] = [];
      for (let y = 0; y < this.NUM_CELLS; y++) {
        grid[x][y] = false;
      }
    }

    return grid;
  }

  randomize = () => {
    const randomizeLimit = 0.15;
    let grid = this.state.grid.slice();
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        let cell = new Cell();
        if (Math.random() < randomizeLimit) {
          cell.create();
        } 
        grid[x][y] = cell;
      }
    }
    this.setState({grid: grid});
    console.log('randomized');
  }

  clear = () => {
    let grid = this.state.grid.slice();
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        let cell = new Cell();
        cell.kill();
        grid[x][y] = cell;
      }
    }
    this.setState({grid: grid});
    console.log('cleared');
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <div className="app">
        <Game grid={this.state.grid} numCells={this.NUM_CELLS} randomize={this.randomize} />
        <Controls generationNumber={this.state.generationNumber} clear={this.clear} randomize={this.randomize} />
      </div>
    );
  }
}

export default App;
