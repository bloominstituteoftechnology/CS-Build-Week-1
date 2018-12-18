import React, { Component } from 'react';
import './App.css';

import Grid from './components/Grid/Grid';
import Menu from './components/Menu/Menu';

// Stringify array of boxes and then parse it.
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

class App extends Component {
  constructor() {
    super();
    this.rows = 20;
    this.cols = 40;
    this.speed = 100;
    
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  generateRandom = () => {
    console.log("Generating random config...");
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 5) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  clearGrid = () => {
    console.log("Clearing grid...");
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        gridCopy[i][j] = false;
      }
    }
    this.setState({
      gridFull: gridCopy,
      generation: 0
    });
  }

  playGame = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.gameAlgorithm, this.speed);
  }

  stopGame = () => {
    clearInterval(this.intervalId);
  }

  gameAlgorithm = () => {
    let grid = this.state.gridFull;
    let grid2 = arrayClone(this.state.gridFull);
    let generationCount = this.state.generation;
    
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;

        // selecting individual boxes
        if(i>0) if(grid[i-1][j]) count++;
        if(i>0 && j>0) if(grid[i-1][j-1]) count++;
        if(i>0 && j<this.cols-1) if(grid[i-1][j+1]) count++;
        if(j<this.cols - 1) if(grid[i][j+1]) count++;
        if(j>0) if(grid[i][j-1]) count++;
        if(i<this.rows-1) if(grid[i+1][j]) count++;
        if(i<this.rows-1 && j>0) if(grid[i+1][j-1]) count++;
        if(i<this.rows-1 && this.cols-1) if(grid[i+1][j+1]) count++;

        // live or dead - Game Logic
        if(grid[i][j] && (count<2 || count>3)) grid2[i][j]=false;
        if(!grid[i][j] && count===3) grid2[i][j]=true;
      }
    }
    generationCount++;
    this.setState({
      generation: generationCount,
      gridFull: grid2
    });
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <h4>Generation: {this.state.generation} </h4>
        <Grid 
          rows={this.rows} 
          cols={this.cols} 
          gridFull={this.state.gridFull} 
          selectBox={this.selectBox}
        />
        <Menu
          generateRandom={this.generateRandom}
          clearGrid={this.clearGrid}
          playGame={this.playGame}
          stopGame={this.stopGame}
        />
        <h5>>> If a cell is alive and it has exactly 2 or 3 living neigbors, it stays alive</h5>
        <h5>>> If a cell is dead and it has exactly 3 living neigbors, it rises again</h5>
      </div>
    );
  }
}

export default App;
