import React, { Component } from 'react';
import Info from './components/Info';
import Game from './components/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Info />
        <Game />
      </div>
    );
  }
}

export default App;
