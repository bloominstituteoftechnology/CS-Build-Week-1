import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js';
import Game3D from './components/Game3D.js';
import About from './components/About';
import {Link, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Conway's Game of Life - by Grant Reighard</h1>
        <Route exact path="/" render={props => <Link to="/about">About this game</Link>} />
        <Route exact path="/" render={props => <Link to="/3d">3D Version</Link>} />
        <Route exact path="/3d" render={props => <Link to="/">2D Version</Link>} />
        <Route exact path="/" render={props => <Game />} />
        <Route path="/3d" render={props => <Game3D />} />
        <Route path="/about" render={props => <About />} />
      </div>
    );
  }
}

export default App;
