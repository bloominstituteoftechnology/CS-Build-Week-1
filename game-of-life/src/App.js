import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: [],
      generation: 0,

    }

  }
  draw = () => {
    const canv = this.refs.canvas;
    const ctx = canv.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canv.width, canv.height);
    let screenbuffer = imageData.data;

  }




  render() {
    return (
      <div className="App">
        <Route exact path = '/' component={Welcome} />
        <Route path = '/about' component={About} />
        <Route path = '/rules' component={Rules} />
        <Route path = '/gameoflife' render={props => <LifeCanvas />} />
      </div>
    );
  }
}

export default App;
