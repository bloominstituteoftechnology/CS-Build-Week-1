import React, { Component } from 'react';
import LifeCanvas from './components/LifeCanvas';
import GameInfo from './components/GameInfo';
import IncrementDecrement from './components/IncrementDecrement';
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state = {
      rows : 15,
      cols : 15,
    }
  }

  
  incrementOrDecrement = (e) => {

    let args = e.target.name.split("_");

    if(args[1] === "plus"){
      this.setState({ [args[0]] : this.state[args[0]] + 1 })
    }else{
      this.setState({ [args[0]] : this.state[args[0]] - 1 })
    }
  }

  render() {
    return (
      <div className="App">
        <LifeCanvas rows={this.state.rows} cols={this.state.cols}/>
        <GameInfo />
        <IncrementDecrement clickHandler={this.incrementOrDecrement} rows={this.state.rows} cols={this.state.cols} />
      </div>
    );
  }
}

export default App;
