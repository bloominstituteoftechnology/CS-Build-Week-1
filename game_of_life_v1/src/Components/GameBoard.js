import React, { Component } from 'react';

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            generationNumber: 0,
            board: [
                [0, 0, 0],
                [0, 0, 0], 
                [0, 0, 0]
                ], 
        }
    }

    // toggle_state()

  render() {
    return (
      <div>
        Game of Life - v1
      </div>
    );
  }
}

export default GameBoard