import React, {Component} from 'react';
import './App.css';
import LifeCanvas from './gameComponents/LifeCanvas.js';

class App extends Component {
  render () {
    return (
      <div className="App">
        <h1>Conway's Game Of Life</h1>
        <LifeCanvas />
      </div>
    );
  }
}

export default App;
