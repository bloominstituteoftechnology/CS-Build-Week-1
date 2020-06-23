import React, {useState} from 'react'; 
import {Link} from 'react-router-dom';
import './Board.css';

// initial state of game board
const initBoardState = {
  counter: 0,
}

// initial state of a cell 
const initCellState = { 
  alive: false, 
}


function Board() {
  const [boardData, setBoardData] = useState(initBoardState);
  const [cellData, setCellData] = useState(initCellState);

  return (
    <div className="main">
      <h1>Conway's Game of Life</h1>

      <div className="board">
        {/* TODO - extract grid to individual component maybe */}
        {/* <Grid /> maybe some props passed down */}
        <div className="grid">
          <p>inside grid</p>
        </div>   

        <div className="home">
          <Link to="/"><button>Home</button></Link>
        </div>
      </div>

    </div>
  );
}

export default Board;