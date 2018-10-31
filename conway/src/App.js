import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import Game from './Components/Game';

const Title = styled.h1`
  width: 100%;
  size: 15px;
  height: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 800px;
`;

const AboutSection = styled.div`
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Content>
        <Title>Conway's Game of Life</Title>
          <Game/>
          <div className="Rules">
            <h2>Rules:</h2>
          </div>
          <AboutSection>
            <h2>About this Algorithm:</h2>
            <p>Explain Conway's Game of Life and its history. Blah blah blah...</p>
            <p>If you would like to learn more about Conway's Game of Life, check out this <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">link!</a></p>
        </AboutSection>
        </Content>
      </div>
    );
  }
}

export default App;
