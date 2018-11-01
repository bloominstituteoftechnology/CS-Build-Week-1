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

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({gridFull: gridCopy});
  }

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

  componentDidMount() {
    this.randomizer();
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
