import React, { Component } from 'react';
import './App.css';

import Gameboard from './components/gameboard/Gameboard';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Gameboard />
      </div>
    );
  }
}

export default App;
