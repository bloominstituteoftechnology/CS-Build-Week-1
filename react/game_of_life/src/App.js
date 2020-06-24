import React from 'react';
import './App.css';
import Game from './components/Game';
import Home from './components/Home';

import {Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/game">
        <Game />
      </Route>
    </div>
  );
}

export default App;
