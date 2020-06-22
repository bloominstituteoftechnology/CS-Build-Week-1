import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Game of Life</h1> 

      {/* 
        
        TODO - Either create a gameboard grid within
        the main home page (reduce need to navigate to other pages)
        OR 
        create a link to gameboard as a seperate component
        
      */}

      {/* TODO - create a section for game rules */}
      <div className="game-rules">
        {/* TODO - add game rules here as numerical steps */}
      </div>

      {/* TODO - create a section that explains purpose/origination of game */}
      <div className="game-origin">
        {/* TODO - game purpose/origination */}
      </div>

    </div>
  );
}

export default App;
