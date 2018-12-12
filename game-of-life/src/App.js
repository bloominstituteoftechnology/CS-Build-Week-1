import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Game from './components/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background"></div>
        <Navigation />
        <Game />
      </div>
    );
  }
}

export default App;
