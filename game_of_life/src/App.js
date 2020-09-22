import React from 'react';
import Game from './components/Game';
import Rules from './components/Rules';
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="Main">
        <Game />
        <Rules />
      </div>
    </div>
  );
}

export default App;
