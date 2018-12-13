import React, { Component } from 'react';
import './App.css';
import LifeCanvas from './gameComponents/LifeCanvas.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conway's Game Of Life</h1>
        <LifeCanvas/>
        <h2>Rules</h2>
        <ul>
          <li><span>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</span></li>
          <li><span>Any live cell with two or three live neighbors lives on to the next generation.</span></li>
          <li><span>Any live cell with more than three live neighbors dies, as if by overpopulation.</span></li>
          <li><span>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</span></li>
        </ul>
        <p className='lifeInfo'>
          The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician 
          John Horton Conway in 1970.  The Game of Life is Turing Complete.  It is Turing Complete based on the definition that 
          a computing system is Turing Complete if it is capable of performing arbitrary, general purpose computation.
          This is made possible by using a construct in The Game of Life called a glider gun which enables the creation of a 
          NAND gate.  The infinite grid of The Game Of Life allows the NAND gate to build other types of logical circuitry
          and memory.  Anything that can be computed can be be computed in The Game Of Life given a large enough grid and 
          time.
        </p>
      </div>
    );
  }
}

export default App;
