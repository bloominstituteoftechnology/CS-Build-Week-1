import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';

// components
import Header from './components/Header'
import About from './components/About'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Conway's Game of Life" />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default App;
