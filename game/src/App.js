import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Conway's Game of Life - by Grant Reighard</h1>
        <Game />
      </div>
    );
  }
}

export default App;
