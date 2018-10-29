import React, { Component } from 'react';
import Board from './components/board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Board />
      </div>
    );
  }
}

export default App;
