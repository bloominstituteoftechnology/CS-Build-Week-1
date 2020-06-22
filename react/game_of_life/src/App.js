import React from 'react';
import './App.css';
import Board from './components/Board';


function App() {
  return (
    <div className="App">
      <h1>Game of Life</h1> 

      {/* Game origination and purpose */}
      <div className="game-specs">
          <h2>Welcome to John Conway's "Game of Life"!</h2>
          <p>This is a computer science classic from 1970, a program that simulates a _cellular automaton_
(plural _automata_). It has connections to all kinds of different
aspects of computer science and nature.
          </p>
      </div>

      {/* Game specifications */}
      <div className="game-specs">
        <h2>Rules of the game</h2>

        <p>In the Game of Life, these rules examine each cell of the grid. For each
        cell, it counts that cell's eight neighbors (up, down, left, right, and
        diagonals), and then act on that result.</p>

        <li> If the cell is alive AND has 2 or 3 neighbors, then it remains
          alive. Else it dies.</li>
        <li> If the cell is dead AND has exactly 3 neighbors, then it comes to
          life</li>
      </div> 

      <div className="game-specs start-game">
          {/* TODO - button that will render board game below instructions */}
      </div>

    </div>
  );
}

export default App;
