import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class LifeApp extends Component {
  
  render() {
    return (
      <div>
        <LifeCanvas width={450} height={350} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <LifeApp />
      </div>
    );
  }
}


export default App;
