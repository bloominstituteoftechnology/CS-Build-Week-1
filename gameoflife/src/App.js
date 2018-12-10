import React, { Component } from 'react';
import './App.css';
import Canvas from './components/Canvas';



export default class App extends Component {
  constructor(){
    super(); 
    this.state = {
      'pixels': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 
    }
  }


  render() {
    return (
      <div className="App">
      <Canvas></Canvas>
      </div>
    );
  }
}
