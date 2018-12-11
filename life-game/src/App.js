import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard'





class App extends Component {

clearGrid = (e) => {
  const can = this.refs.canvas
  const context = can.getContext("2d");
  context.clearRect(0,0,can.width,can.height)
  this.drawGrid()
  this.gridStateInit()
} 

 render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>

        <GameBoard/>

        <div className = 'buttons'>
        <button>play</button>
        <button>stop</button>
        <button onClick={this.clearGrid}>clear</button>
        </div>
        <div>Game Rules:</div>

      </div>
    );
  }
}

export default App;
