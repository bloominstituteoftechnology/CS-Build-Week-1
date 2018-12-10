import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <GameBoard/>
      </div>
    );
  }
}

export default App;
