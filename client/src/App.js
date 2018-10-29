import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Panel from './Panel';

class App extends Component {
  render() {
    return (
      <div className="App">
        Main App
        <Board />
        <Panel />
      </div>
    );
  }
}

export default App;
