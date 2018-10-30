import React, { Component } from 'react';
import Board from './components/board';
import Control from './components/control';
import Counter from './components/counter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Board />
        <Control />
        <Counter />
      </div>
    );
  }
}

export default App;