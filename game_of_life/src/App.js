import React from 'react';
import Game from './components/Game';
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <Game />
    </div>
  );
}

export default App;
