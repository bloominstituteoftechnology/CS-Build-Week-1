import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home () { 
  return (
    <div className="main">
      <h1>Conway's Game of Life</h1> 

      <div className="game-specs">
          <h2>Welcome to John Conway's "Game of Life"!</h2>
          <p>
            This is a computer science classic from 1970, a program that simulates a _cellular automaton_
            (plural _automata_). It has connections to all kinds of different aspects of computer science and nature.
          </p>
      </div>

      <div className="game-specs">
        <h2>Rules of the game</h2>
        <p>
          In the Game of Life, these rules examine each cell of the grid. For each
          cell, it counts that cell's eight neighbors (up, down, left, right, and
          diagonals), and then act on that result.
        </p>
        <ul>
          <li> 
            If the cell is alive AND has 2 or 3 neighbors, then it remains alive. Else it dies.
          </li>
          <li>
            If the cell is dead AND has exactly 3 neighbors then it comes to life.
          </li>
        </ul>
      </div> 

      <div className="game-specs start-game">
        <Link to="/game"><button>Get Started!</button></Link>
      </div>
    </div>
  );
}

export default Home;