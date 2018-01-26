import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class myComponent extends Component {
  constructor(props) {
    super(props);

    this.continueAnimation = true;
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.onAminFrame();
    });
  }
  componentWillUnmount() {
    this.continueAnimation = false;
  }

  onAminFrame(timestamp) {
    //animates via cb
    if (this.continueAnimation) {
      requestAnimationFrame(() => {
        this.onAminFrame();
      });
    }
  }

  render() {
    return <canvas width="300" height="300" />;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <myComponent />
      </div>
    );
  }
}

export default App;
