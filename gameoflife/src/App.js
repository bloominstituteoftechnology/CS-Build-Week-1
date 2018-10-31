import React, { Component } from 'react';
import './App.css';
import ButtonContainer from './components/ButtonContainer';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    this.rows = 15;
    this.cols = 15;

    this.state = {
      generation: 0,
      speed: 500,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }
  }

  arrayClone = arr => {
    return JSON.parse(JSON.stringify(arr));
  }

  selectCell = (row, col) => {
		let gridCopy = this.arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			gridFull: gridCopy
		});
  }

  playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
  }
  
  pauseButton = () => {
		clearInterval(this.intervalId);
  }

  changeSpeed = (speed) => {
    if (speed === 'increase') {
      this.setState({
        
      })
    }
	}

  clearButton = () => {
    var grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));

		this.setState({
			gridFull: grid,
			generation: 0
		});
  }
  
  play = () => {
		let g = this.state.gridFull;
		let g2 = this.arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++; 
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++; 
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++; 
		    if (j < this.cols - 1) if (g[i][j + 1]) count++; 
		    if (j > 0) if (g[i][j - 1]) count++; 
		    if (i < this.rows - 1) if (g[i + 1][j]) count++; 
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++; 
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++; 
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
    }

		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
    });
  }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Conway's Game of Life</h3>
        </header>
        <h3 className="center">Generations: {this.state.generation}</h3>
        <h3 className="center">Speed Per Generation: {this.state.generation} seconds</h3>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectCell={this.selectCell}
        />
        <ButtonContainer 
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          clearButton={this.clearButton}
        />
      </div>
    );
  }
}

export default App;
