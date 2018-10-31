import React, { Component } from 'react';
import Grid from './components/Grid'
import Buttons from './components/Buttons'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <br />
        Game of Life
        <br /><br />
        <Grid />
        <Buttons />
      </div>
    );
  }
}

export default App;