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
    
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
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
        <Menu/>
      </div>
    );
  }
}

export default App;
