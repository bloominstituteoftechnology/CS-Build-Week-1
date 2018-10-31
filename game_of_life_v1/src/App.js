import React, { Component } from 'react';
import './App.css';
import GameBoard from './Components/GameBoard';

class App extends Component {
  render() {
    return (
      <div>
        Game of Life - v1
        <GameBoard />
      </div>
    );
  }
}

export default App;
