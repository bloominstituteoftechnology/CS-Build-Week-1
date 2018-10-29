import React, { Component } from 'react';
import './App.css';
import LifeCanvas from './Canvas/LifeCanvas';
import { Life } from './Canvas/Life';

class App extends Component {
  render() {
    return (
      <div>

        <LifeCanvas />

      </div>
    );
  }
}

export default App;
