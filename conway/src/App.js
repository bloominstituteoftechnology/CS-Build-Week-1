import React from 'react';
import Game from './components/game';
import Nav from './layout/nav';
import Header from './layout/header'
import About from './layout/about';

import { Route } from 'react-router-dom';
import './styles/Game.css';
function App() {
  return (
    <div className="App">
      <Nav />
      <div className="container">
      <Header/>
      <Route exact path ='/' component={Game}/>
      <Route path='/about' component={About}/>
      </div>
    </div>
  );
}

export default App;
