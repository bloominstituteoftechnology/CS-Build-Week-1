import React, {useState} from 'react'; 
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
    <div className="Board">
      {/* display a 25x25 grid */}
      <h1>I am a header inside the Board</h1>
    </div>
  );
}

export default Board;