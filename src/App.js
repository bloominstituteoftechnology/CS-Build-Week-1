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
  height: 100%;
`
const StyledIncrementDecrement = styled.div`
  position: absolute;
  top: 5%;
  left: 34%;
  background-image: linear-gradient(to right, rgba(52, 187, 229, 0.4), rgba(139, 189, 184, 0.96));
  padding: 1%;
`

const Canvas = styled.div`
  position: absolute;
  z-index: 1;
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
        <Canvas>
          <LifeCanvas rows={this.state.rows} cols={this.state.cols}/>
        </Canvas>
        <StyledIncrementDecrement> 
          <IncrementDecrement clickHandler={this.incrementOrDecrement} rows={this.state.rows} cols={this.state.cols} />
        </StyledIncrementDecrement>
        <GameInfo />
        <Rules />

      </Container>
    );
  }
}

export default App;
