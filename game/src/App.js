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
    this.GENERATION_RATE = 50;
    this.state = {
      generationInterval: undefined,
      generationNumber: 0,
      grid: this.createGrid(),
      isShowingPlay: false
    };
  }

  createGrid = () => {
    const grid = [];

    for (let x = 0; x < this.NUM_CELLS; x++) {
      grid[x] = [];
      for (let y = 0; y < this.NUM_CELLS; y++) {
        grid[x][y] = new Cell();
      }
    }

    return grid;
  }

  step = () => {
    clearInterval(this.state.generationInterval);
    this.setState({generationInterval: undefined});
    this.generate();
  }

	generate = () => {
		let newGrid = [];
		for (let x = 0; x < this.state.grid.length; x++) {
			newGrid[x] = [];
		}
		
		for (let x = 0; x < this.state.grid.length; x++) {
			for (let y = 0; y < this.state.grid.length; y++) {
				let neighbors = this.getNeighborCount(x, y);
        let cell = new Cell();
        
				if (this.state.grid[x][y].isAlive) {
					if (neighbors === 2 || neighbors === 3) {
            cell.create();
          } else if (neighbors < 2 || neighbors > 3) {
            cell.kill();
          }
				} else {
					if (neighbors === 3) {
            cell.create();
          }
        }
        newGrid[x][y] = cell;
			}
		}
		
    this.setState({grid: newGrid, generationNumber: this.state.generationNumber + 1});
  }
  
  getNeighborCount = (cellX, cellY) => {
		let neighborCount = 0;
		
		for (let x = cellX - 1; x <= cellX + 1; x++) {
			for (let y = cellY - 1; y <= cellY + 1; y++) {
				if (x === cellX && y === cellY) {
          continue;
        }
				if (x < 0 || x >= this.state.grid.length || y < 0 || y >= this.state.grid[x].length) {
          continue;
        }	
				if (this.state.grid[x][y].isAlive) {
          neighborCount++;
        }	
			}
		}
		
		return neighborCount;
	}

  playStop = () => {
    if (this.state.isShowingPlay) {
      this.stop();
    } else {
      this.play();
    }
  }

  stop = () => {
    clearInterval(this.state.generationInterval);
    this.setState({generationInterval: undefined, isShowingPlay: false});
  }

  play = () => {
    if (this.checkIsClear()) {
      this.randomize();
    }

    this.setState({generationInterval: setInterval(this.generate, this.GENERATION_RATE), isShowingPlay: true});
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
    this.setState({grid: grid, generationNumber: 0});
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
    this.stop();
    this.setState({grid: grid, generationNumber: 0});
  }

  checkIsClear = () => {
    let grid = this.state.grid.slice();
    var isClear = true;
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        let cell = grid[x][y];
        if (cell.isAlive) {
          isClear = false;
          break;
        }
      }
    }

    return isClear;
  }

  componentDidMount = () => {
    this.play();
  }

  render() {
    return (
      <div className="app">
        <Game grid={this.state.grid} numCells={this.NUM_CELLS} randomize={this.randomize} />
        <Controls step={this.step} clear={this.clear} playStop={this.playStop} randomize={this.randomize} isShowingPlay={this.state.isShowingPlay} generationNumber={this.state.generationNumber} />
      </div>
    );
  }
}

export default App;
