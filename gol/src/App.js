import React, { Component } from 'react';
import './App.css';
import Grid from './components/GameGrid';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = { curGrid: [{color:'#ffffff'}],
    x: 15,
    y: 15
    };
  }
  newGrid = ()=>{
    let freshGrid = [];
    for (let index = 0; index < (this.state.x*this.state.y) ; index++) {
      freshGrid.push({alive:true, color:'#000000'})
    }
    this.setState({
      curGrid:freshGrid
    })
  }
  componentDidMount(){
    this.newGrid();
  }
  render() {
    return (
      <div className="App">
       <Grid pixels={this.state.curGrid} x={this.state.x} y ={this.state.y}/>
      </div>
    );
  }
}

export default App;
