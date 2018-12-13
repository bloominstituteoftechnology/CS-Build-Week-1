import React, { Component } from 'react';
import Game from "./Game"
import './App.css';

const Rules = () => {
  return (
    <div className="cardface back">
      <h2>Rules</h2>
      <p className="rules">
        In the game of life each cell can be alive or dead. 
        Live cells will remain alive as long as they have at least 2 neighbors.
        Any less, and the cells will die of loneliness. 
        <br/><br/>However, more than 3 neighbors and the cells will feel totally overburdened 
        and just want to be left alone, so they feign death. But for your purposes, 
        we'll consider them truly dead.
        <br/><br/>If a cell is dead and lucky enough to be surrounded by 3 loving and supportive 
        neighbors, it will come to life, and thus, the Game of Life continues. 
      </p>
      <h2>About</h2>
      <p className="rules">
        Conway's Game of Life is a famous cellular automaton dreamed up in 1970. Cellular automata are 
        defined as having a set of cells with multiple states, such as "living" or "dead". The states of these 
        cells are determined by adjacent cells, or "neighbors". The effect neighbors have on a cell is 
        determined by a set of rules that varies upon the version. 
        <br/><br/>The point of the "game" is simply to place a set of starter cells and watch them as they change based on the set of rules above. 
        <br/><br/>
      </p>
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    }
  }
  render() {
    return(
      <div>
        <div className="cornerClick" onClick={() => this.setState({isFlipped: !this.state.isFlipped})}>
            Click to flip
          </div>
        <div className="scene">
          <div className={`gameCard ${this.state.isFlipped ? "isFlipped" : null}`}>
            <Game/>
            <Rules/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;