import React, { Component } from "react";
import CustomNav from "../CustomNav";
import "./Rules.css";

class Rules extends Component {
  render() {
    return (
      <div>
        <CustomNav />
        <h1>Rules</h1>
        <div className="container">
          <p>
            The universe of the <i>Game of Life</i> is an infinite,
            two-dimensional orthogonal grid of square <i>cells</i>, each of
            which is in one of two possible states, <i>alive</i> or <i>dead</i>,
            (or <i>populated</i> and <i>unpopulated</i>, respectively). Every
            cell interacts with its eight <i>neighbors</i>, which are the cells
            that are horizontally, vertically, or diagonally adjacent. At each
            step in time, the following transitions occur:
          </p>
          <ol>
            <li>
              Any live cell with fewer than two live neighbors dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbors lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbors dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbors becomes a live
              cell, as if by reproduction.
            </li>
          </ol>
          <p>
            The initial pattern constitutes the <i>seed</i> of the system. The
            first generation is created by applying the above rules
            simultaneously to every cell in the seed; births and deaths occur
            simultaneously, and the discrete moment at which this happens is
            sometimes called a <i>tick</i>. Each generation is a pure function
            of the preceding one. The rules continue to be applied repeatedly to
            create further generations.
          </p>
        </div>
      </div>
    );
  }
}

export default Rules;
