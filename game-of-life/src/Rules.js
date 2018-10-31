import React from 'react';
import './App.css';

const Rules = props => {
  return (
    <div className="rules-container">
      <h2>The Rules</h2>
      <p>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</p>
      <p>Any live cell with two or three live neighbors lives on to the next generation.</p>
      <p>Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
      <p>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</p>
      <h3>- <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a></h3>
    </div>
  );
};

export default Rules;
