import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LifeCanvas from './components/LifeCanvas';
import Rules from './components/Rules';
import Welcome from './components/Welcome';
import About from './components/About';


class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     generation: 0,
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Route exact path = '/' component={Welcome} />
        <Route path = '/rules' component={Rules} />
        <Route path = '/about' component={About} />
        <Route path = '/gameoflife' component={LifeCanvas} />
      </div>
    );
  }
}

export default App;
