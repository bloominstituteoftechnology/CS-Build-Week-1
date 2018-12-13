import React, { Component } from 'react';
import './App.css';
import LifeCanvas from './gameComponents/LifeCanvas.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Game Of Life</h1>
        <LifeCanvas/>
        <h2>Rules</h2>
        <ul>
          <li><span>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</span></li>
          <li><span>Any live cell with two or three live neighbors lives on to the next generation.</span></li>
          <li><span>Any live cell with more than three live neighbors dies, as if by overpopulation.</span></li>
          <li><span>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</span></li>
        </ul>
      </div>
    );
  }
}

export default App;
