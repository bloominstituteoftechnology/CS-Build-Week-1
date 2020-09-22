import React from 'react';
import Game from './components/Game';
import Info from './components/Info';
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="Main">
        <Game />
        <Info />
      </div>
    </div>
  );
}

export default App;
