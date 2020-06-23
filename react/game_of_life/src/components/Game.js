import React, {useState} from 'react'; 
import {Link} from 'react-router-dom';
import './Game.css';

// initial state of game board
const initGameState = {
  cells: [],
}

// Default game board values
const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

function Game() {
  const [gameData, setGameData] = useState(initGameState);

  // Create variables to hold current number of rows and cols
  let rows = HEIGHT / CELL_SIZE;
  let cols = WIDTH / CELL_SIZE;    
  
  const makeEmptyBoard = () => {    
    let board = [];   

    // Create x and y axis
    for (let y = 0; y < rows; y++) {                  board[y] = [];      
      for (let x = 0; x < cols; x++) {              board[y][x] = false;
      }    
    } 
    return board;   
  }

  // intialize a board
  let board = makeEmptyBoard();  

  return (
    <div className="Main">
      <h1>Conway's Game of Life</h1>

      <div className="Home">
        <Link to="/"><button>Home</button></Link>
      </div>
      
      <div 
        className="Board" 
        style={{ 
          width: WIDTH, 
          height: HEIGHT, 
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
        }}>
      </div>

    </div>
  );
}



export default Game;