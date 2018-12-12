import React from 'react';
import './Game.css';


const game_cell = 15;


class GameCell extends React.Component {
    render() {
      const { x, y } = this.props;
      return (
        <div className="indivCell" style={{
          width: `${game_cell - 1}px`,
          height: `${game_cell - 1}px`,
          left: `${game_cell * x + 1}px`,
          top: `${game_cell * y + 1}px`,
          
        }} />
      );
    }
  }


  export default GameCell;