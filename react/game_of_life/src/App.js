import React from 'react';
import './App.css';
import Board from './components/Board';
import Home from './components/Home';

import {Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/game">
        <Board />
      </Route>
    </div>
  );
}

export default App;
