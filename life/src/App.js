import React, { Component } from 'react';
import styled from 'styled-components';
import GridObject from './components/gridObject';
import { SketchPicker } from 'react-color';

class App extends Component {
  constructor(){
    super();
    this.state = {
      color: "#DE4C26",
      preset: null,
    }
  }

  selectColor = (color) => {
    console.log("select color")
    this.setState({
      color: color.hex,
    })
  }

  render() {
    return (
      <AppDiv>
        Conways "Game of Life"
        {/* <Canvas /> */}
        {/* <Grid /> */}
        <div>
          <GridObject color={this.state.color} />
            <SketchPicker 
              color={this.state.color}
              onChangeComplete={ this.selectColor}
            />
        </div>
        <p>Click to toggle squares. Press 'next' to advance one frame at at time or hit start to progress automatically</p>
        <p>If the cell is alive **and** has 2 or 3 neighbors, then it remains
  alive. Else it dies.</p>
        <p>If the cell is dead **and** has exactly 3 neighbors, then it comes to
  life. Else if remains dead.</p>

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