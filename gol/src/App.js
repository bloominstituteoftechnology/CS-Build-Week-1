import React, { Component } from 'react';
import './App.scss';
import Header from './Header/Header';
import Rules from './Rules/Rules';
import Controls from './Controls/Controls';
import GridSketch from './GOL/GridComponent';
import sketch from './GOL/GridSketch';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRollin: false,
    }
  }

  componentDidMount(){
    console.log(this.state.isRollin);
  }

  goBlastEm = () => {
    console.log("Go Blast'em!!");
    this.setState({ isRollin : !this.state.isRollin });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header></Header>
          <Rules></Rules>
          <Controls goBlast={this.goBlastEm}></Controls>
          <GridSketch className="grid-sketch" data={this.state}></GridSketch>
        </header>
      </div>
    );
  }
}

export default App;
