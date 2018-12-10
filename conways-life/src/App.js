import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Hello world</p>
        <Grid />
      </div>
    );
  }
}

export default App;
