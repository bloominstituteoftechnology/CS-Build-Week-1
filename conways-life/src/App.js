import React, { Component } from 'react';
import Grid from './components/Grid'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <br />
        Game of Life
        <br /><br />
        <Grid />
      </div>
    );
  }
}

export default App;
