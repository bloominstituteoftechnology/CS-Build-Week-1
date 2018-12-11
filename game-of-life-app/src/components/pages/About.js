import React from "react";
import { StyledSection } from "../globals/global-styles";
import {StyledLink} from './Header'

const About = props => (
  <>
    <StyledSection>
      <h1>About</h1>
      <p>
        From Wikipedia: "The Game of Life, also known simply as Life, is a
        cellular automaton devised by the British mathematician John Horton
        Conway in 1970."
      </p>

      <p>
        "The game is a zero-player game, meaning that its evolution is
        determined by its initial state, requiring no further input. One
        interacts with the Game of Life by creating an initial configuration and
        observing how it evolves, or, for advanced players, by creating patterns
        with particular properties."
      </p>
      <p>
        "The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, alive or dead, (or populated and unpopulated, respectively).
        Every cell interacts with its eight neighbours, which are the cells that
        are horizontally, vertically, or diagonally adjacent. At each step in
        time, the following transitions occur:
        <ol>
          <li>
            Any live cell with fewer than two live neighbors dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbors lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbors dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbors becomes a live cell,
            as if by reproduction.
          </li>
        </ol>
        The initial pattern constitutes the seed of the system. The first
        generation is created by applying the above rules simultaneously to
        every cell in the seed; births and deaths occur simultaneously, and the
        discrete moment at which this happens is sometimes called a tick. Each
        generation is a pure function of the preceding one. The rules continue
        to be applied repeatedly to create further generations."
        
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="blank">Read more on Wikipedia...</a>
      </p>
    </StyledSection>
  </>
);

export default About;
