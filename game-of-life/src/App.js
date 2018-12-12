import React, { Component } from 'react';
import './App.css';

import Grid from './components/Grid/Grid';


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

  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <Grid 
          rows={this.rows} 
          cols={this.cols} 
          gridFull={this.state.gridFull} 
        />
        <h3>Generation: {this.state.generation} </h3>
      </div>
    );
  }
}

export default App;
