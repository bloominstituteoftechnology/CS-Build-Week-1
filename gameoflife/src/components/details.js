import React from "react";


const Details = () => {
  return (
    <div className="details-container">
      <div className="rules-container">
        <h2>Game of Life's Four Rules</h2>
        <ol>
          <li>
            1. Any live cell with fewer than two live neighbors dies, as if by
            underpopulation
          </li>
          <li>
            2. Any live cell with two or three live neighbors lives on to the
            next generation.{" "}
          </li>
          <li>
            3. Any live cell with more than three live neighbors dies, as if by
            overpopulation{" "}
          </li>
          <li>
            4. Any dead cell with exactly three live neighbors becomes a live
            cell, as if by reproduction.
          </li>
        </ol>
      </div>
      <div className="history-container">
        <h2>History of Game of Life</h2>
        <div>
          It is a zero-player game. The game begins with the initial state, and
          requiring no further input. Interaction all starts with clicking on
          cells to activate them and observe how that will evolve given the four
          rules above. Given the correct input, patterns with specific
          properties can be created.
        </div>
      </div>
    </div>
  );
};

export default Details;
