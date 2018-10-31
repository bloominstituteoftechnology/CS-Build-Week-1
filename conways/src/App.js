import React, { Component } from 'react';
import LifeCanvas from './components/LifeCanvas';
import GameInfo from './components/GameInfo';
import IncrementDecrement from './components/IncrementDecrement';
import Rules from './components/Rules';
import styled from 'styled-components';
import './App.css';
import img from './img/galaxy.jpg';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-image: url(${img});
  background-size: cover;
  // background-color: coral;
  border: 2px solid red;
  height: 100%;
`
const StyledIncrementDecrement = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  background-image: linear-gradient(to right, rgba(52, 187, 229, 0.18), rgba(139, 189, 184, 0.96));
  padding: 1%;
`

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
      <Container className="App">
        <GameInfo />
        <LifeCanvas rows={this.state.rows} cols={this.state.cols}/>
        <StyledIncrementDecrement> 
          <IncrementDecrement clickHandler={this.incrementOrDecrement} rows={this.state.rows} cols={this.state.cols} />
        </StyledIncrementDecrement>
        <Rules />
      </Container>
    );
  }
}

export default App;
