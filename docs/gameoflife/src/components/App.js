import React, { Component } from 'react';
import './App.css';
import LifeCanvas from './Canvas/LifeCanvas';

class App extends Component {
  render() {
    return (
      <div className='App'>

        <LifeCanvas />

      </div>
    );
  }
}

export default App;
