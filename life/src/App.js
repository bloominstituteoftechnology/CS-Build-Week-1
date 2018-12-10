import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from './components/grid';
import Canvas from './components/canvas';

class App extends Component {
  render() {
    return (
      <AppDiv>
        AppDiv
        {/* <Canvas /> */}
        <Grid />
      </AppDiv>
    );
  }
}

export default App;

const AppDiv = styled.div`
  border: 1px solid red;
  height: 100vh;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;