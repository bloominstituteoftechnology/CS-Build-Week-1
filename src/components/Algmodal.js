import React from 'react';

const Algmodal = (props) => {
  return (
    <div id="algModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.handleAlgClose}>&times;</span>
        <h1 className='title'>About the Algorithm and Game</h1>
        <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician 
          John Horton Conway in 1970. One interacts with the Game of Life by creating an initial configuration and 
          observing how it evolves, or, for advanced players, by creating patterns with particular properties.</p>
        <p>Conway's Game of Life has the power of a universal Turing machine meaning anything that can be computed 
          algorithmically can be computed.</p>
        <p>*Cellular Automata - one of a set of units in a mathematical model that have simple rules governing their 
          replication and destruction. They are used to model complex systems composed of simple units such as living 
          things or parallel processors.</p>
        <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway's Game of Life - Wikipedia</a>
      </div>
    </div>
  );
}
 
export default Algmodal;