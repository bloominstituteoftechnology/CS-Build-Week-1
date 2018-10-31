import React, { Component } from 'react';
import LifeCanvas from './components/LifeCanvas';
import GameInfo from './components/GameInfo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LifeCanvas rows={20} cols = {20}/>
        <GameInfo />
      </div>
    );
  }
}

export default App;
