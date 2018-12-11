import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './Header/Header';
import Rules from './Rules/Rules';
import Controls from './Controls/Controls';
import GridSketch from './GOL/GridComponent';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header></Header>
          <Rules></Rules>
          <Controls></Controls>
          <GridSketch className="grid-sketch"></GridSketch>
        </header>
      </div>
    );
  }
}

export default App;
