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
  width: 1000px;
`;

const Rules = styled.div`
  width: 360px;
  font-weight: bold;
`;

const Bullet = styled.ul`
  margin-bottom: 10px;
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
          <Rules className="Rules">
            <h2>Rules:</h2>
            <Bullet>1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.</Bullet>
            <Bullet>2. Any live cell with two or three live neighbors livess on to the next generation.</Bullet>
            <Bullet>3. Any live cell with more than 3 neighbors dies as if by overpopulation.</Bullet>
            <Bullet>4. Any dead cell with exactly threee live neighbors becomes a live cell, as if by reproduction.</Bullet>
            <Bullet>5. Cells off the grid are either assumed to be dead, or wrap around to neighbor the next cell on the row below.</Bullet>
          </Rules>
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
