import React from 'react';
import './App.css';
import Game from './componenents/Game.js';
import Rules from './componenents/Rules.js';
import About from './componenents/About.js';

function App() {
  return (
    <div>
    <Rules/>
     <Game/>
     <About/>
    </div>
  ); 
}

export default App;
