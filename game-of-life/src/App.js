import React, { Component } from 'react';
import './App.css';

import Grid from './components/Grid/Grid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      generation: 0,
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <Grid/>
        <h1>Generation: {this.state.generation} </h1>
      </div>
    );
  }
}

export default App;
