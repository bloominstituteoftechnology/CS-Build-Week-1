import React, { Component } from 'react';
import './App.css';
import Grid from './Grid'


class App extends Component {
  constructor() {
    super();
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  // Select Box Handler
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({gridFull: gridCopy});
  }

  // Fills in random cells to the grid
  randomizer = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 5) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({gridFull: gridCopy});
  }

  // Starts the simulation
  start = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }


  play = () => {
    // Initialize grid and make a clone for changes made
    let grid1 = this.state.gridFull;
    let grid2 = arrayClone(this.state.gridFull);

    // Nested for loop to run through each cell in the grid
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Initialize neighbors
        let neighbors = 0;
        // Check each neighboring box and increase count for each live cell
        // Top
        if (j < this.cols - 1) if (grid1[i][j + 1]) neighbors++;
        // Right
        if (i < this.rows - 1) if (grid1[i + 1][j]) neighbors++;
        // Bottom
        if (j > 0) if (grid1[i][j - 1]) neighbors++;
        // Left
        if (i > 0) if (grid1[i - 1][j]) neighbors++;
        // Top-Left
        if (i > 0 && j < this.cols - 1) if (grid1[i - 1][j + 1]) neighbors++;
        // Top-Right
        if (i < this.rows - 1 && j < this.cols - 1) if (grid1[i + 1][j + 1]) neighbors++;
        // Bottom- Right
        if (i < this.rows - 1 && j > 0) if (grid1[i + 1][j - 1]) neighbors++;
        // Bottom-Left 
        if (i > 0 && j > 0) if (grid1[i - 1][j - 1]) neighbors++;


        // If less than 2 or more than 3 neighbors, kill cell
        if (grid1[i][j] && (neighbors < 2 || neighbors > 3)) grid2[i][j] = false;
        // If cell is dead and has 3 neighbors, cell goes live
		    if (!grid1[i][j] && neighbors === 3) grid2[i][j] = true;
      }
    }
    // Set state to grid2 and increment the generation counter
    this.setState({
		  gridFull: grid2,
		  generation: this.state.generation + 1
		});
  }

  componentDidMount() {
    this.randomizer();
    this.start();
  }

  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <h2>Generations: {this.state.generation}</h2>
        <Grid 
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
