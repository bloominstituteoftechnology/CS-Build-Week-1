import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LifeCanvas from './components/LifeCanvas';


class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     generation: 0,
  //   }
  // }

  // <Route exact path = '/' component={Welcome} />
  // <Route path = '/about' component={About} />
  // <Route path = '/rules' component={Rules} />
  render() {
    return (
      <div className="App">
        <Route path = '/gameoflife' render={props => <LifeCanvas />} />
      </div>
    );
  }
}

export default App;
