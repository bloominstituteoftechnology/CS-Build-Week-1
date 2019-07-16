import React, { useState, useEffect } from 'react';
import './App.css';
import GridContainer from './components/GridContainer/GridContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JAMES BASILE: Conway's Life</h1>
        <p>
          Cellular Automata
        </p>
      </header>
      <div className="game-container">
        <GridContainer />
      </div>
    </div>
  );
}

export default App;
