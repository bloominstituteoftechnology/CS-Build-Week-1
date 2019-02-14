import React from 'react';
import { Link } from 'react-router-dom';

export default function About(props) {
  return (
    <div className="AboutContainer">
      <div className="About">
        <h3>About the Game of Life:</h3>
        <p>
        The Game of Life is a cellular automaton that requires no input once
        the game has begun and outcome depends wholly on the starting state.
        </p>
        <p>
        Cellular automata simulate living beings/organisms and reproduction. They
        are also, by nature, <a href="https://en.wikipedia.org/wiki/Turing_completeness">Turing complete</a>.
        John Conway published his initial game in the October 1970 issue of Scientific American. when
        Conway was first figuring the later development of certain configurations, he did so
        completely by hand.
        </p>
        <p>
        Cellular automata can be used to create musical and visual compositions, to generate
        random numbers and sequences, and to study the development of life itself.
        </p>
        <Link to='/gameoflife'><button>Go to the Game!</button></Link>
        <Link to='/rules'><button>Rules of the Game</button></Link>
      </div>
    </div>
  )
}
