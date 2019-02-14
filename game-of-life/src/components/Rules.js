import React from 'react';
import { Link } from 'react-router-dom';

export default function Rules(props) {
  return (
    <div className="RulesContainer">
      <div className="Rules">
        <h2>Rules for the Game of Life:</h2>
        <h4>In the Game of Life, these rules examine each cell of the grid.
        For each cell, it counts that cell's eight neighbors (up, down, left,
          right, and diagonals), and then act on that result.</h4>
        <ul>
          <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li><br/>
          <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.</li>
        </ul><br/>
        <Link to='/gameoflife'><button>Go to the Game!</button></Link>
        <Link to='/about'><button>About the Game</button></Link>
      </div>
    </div>
  )
}
