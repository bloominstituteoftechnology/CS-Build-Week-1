import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>

        <GameBoard/>

        <div className = 'buttons'>
        <button>play</button>
        <button>stop</button>
        <button>clear</button>
        </div>
        <div>Game Rules:</div>

      </div>
    );
  }
}

export default App;
