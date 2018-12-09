import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './Header/Header';
import Rules from './Rules/Rules';
import Controls from './Controls/Controls';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header></Header>
          <Rules></Rules>
          <Controls></Controls>
        </header>
      </div>
    );
  }
}

export default App;
