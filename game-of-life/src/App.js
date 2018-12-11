import React, { Component } from 'react';
import './App.css';
import Grid from './gameComponents/grid.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid/>
      </div>
    );
  }
}

export default App;
