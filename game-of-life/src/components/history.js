import React, { Component } from 'react';

class History extends Component {
  render(){
    return (
      <div className="history">
         <h3 className="boldtext">History</h3>
         <p>
          Cellular automata are programs that operate on data which is typically stored in a grid. Typically, this grid is 2D, but it could be represented in any dimensions.
         </p>
         <br/>
         <p>
          The Game of Life is a cellular automaton developed by John Horton Conway in 1970.
         </p>
         <br/>
         <p>
          The game itself runs automatically requiring no further input from the time it is started. From then, observing the patterns that emerge or setting up the grid to a desired initial state can be ways in which the game can be enjoyed.
         </p>
         <br/>
         <p>
          In essence, this game is Turing complete, as it is capable of performing arbitrary, general purpose computation— although it may be impractical, it is theoretically possible to compute anything in a large enough grid and given enough time using the Game of Life.
         </p>
      </div>
    );
  }
}


export default History;