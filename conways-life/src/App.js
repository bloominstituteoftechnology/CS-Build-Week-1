import React, { Component } from 'react';
import Grid from './components/Grid';
import Rules from './components/Rules';
import History from './components/History';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Conway's Game of Life</h1>
        <Grid />
        <Rules />
        <History />
      </div>
    );
  }
}

export default App;
