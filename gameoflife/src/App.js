import React, { Component } from 'react';
import './App.css';
import Grid from "./Components/Grid";
import Cell from "./Components/Cell";
import Styled from 'styled-components';

const Container = Styled.div`
  display: flex;
`;

const Button = Styled.button`
  height: 30px;
  width: 100px;
`;

const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clear: false,
      currentGen: 0
    }
  }

  clearGrid = () => {
    this.setState({clear: true})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Game of Life</h2>
        </header>
        <Container>
          <Grid clearGrid={this.clearGrid} clear={this.state.clear}/>
          <ButtonContainer>
            <div>Current: {this.state.currentGen}</div>
            <Button>Start</Button>
            <Button>Stop</Button>
            <Button onClick={this.clearGrid}>Clear</Button>
          </ButtonContainer>
        </Container>
      </div>
    );
  }
}

export default App;
