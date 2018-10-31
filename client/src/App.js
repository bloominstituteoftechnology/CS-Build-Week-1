import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Grid from './Grid'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} alt="logo" className="App-header"/>
          <p><b>About the game</b></p>
          <p className="App-header">
          According to Bitstorm, "This game became widely known when it was mentioned in an article published by Scientific American in 1970. It consists of a collection of cells which, based on a few mathematical rules, can live, die or multiply. Depending on the initial conditions, the cells form various patterns throughout the course of the game."
          </p>
        </header>
          <p><b>The rules</b></p>
          <ol style={{textAlign: 'left', margin: '0'}}>
            <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
            <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
          </ol>
        <Grid />
      </div>
    );
  }
}

export default App;
