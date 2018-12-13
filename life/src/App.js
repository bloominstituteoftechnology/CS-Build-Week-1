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
        <h1>Conways "Game of Life"</h1>
        <div className="main">
          <GridObject color={this.state.color} />
          <SketchPicker 
            style={{margin: "10px"}}
            color={this.state.color}
            onChangeComplete={ this.selectColor}/>
        </div>
        <div className="instructions">
            <p>Click to toggle squares. Press 'next' to advance one frame at at time or hit start to progress automatically</p>
            <p>If the cell is alive **and** has 2 or 3 neighbors, then it remains alive. Else it dies.</p>
            <p>If the cell is dead **and** has exactly 3 neighbors, then it comes to life. Else if remains dead.</p>
        </div>
      </AppDiv>
    );
  }
}

export default App;

const AppDiv = styled.div`
  border: 1px solid red;
  /* height: 100vh; */
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .main{
    border: 1px solid blue;
    display: flex;
    flex-direction: row;
    padding: 10px;
  }
  .instructions{
    border: 1px solid green;
  }
`;