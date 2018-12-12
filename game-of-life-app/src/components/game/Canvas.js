import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const GenerationText = styled.h2`
  font-weight: 700;
  color: #000;
  font-size: 1.6rem;
`;

const CellGrid = styled.div`
  display: grid;
  padding: 1rem 0;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  grid-gap: 0;
`;

const ControlButton = styled.button`
  padding: 0.8rem 1.6rem;
  margin: 1.2rem 1.6rem 0 0;
  background: white;
  min-height: 3.8rem;
  border: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: 700;
  outline: none;
  border-radius: 4rem;
  box-shadow: rgba(72, 76, 87, 0.1) 0px 1px 3px;
  &:hover {
    background: #05f;
    color: white;
  }
`;

const ControlSelect = styled.select`
  background: white;
  border: 1px solid #eee;
  height: 3.8rem;
  padding: 0 1.6rem 0 1.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  width: 13.2rem;
  outline: none;
  box-shadow: rgba(72, 76, 87, 0.1) 0px 1px 3px;
  margin: 1.2rem 1.6rem 0 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

class Canvas extends React.Component {
  state = {
    cells: 400,
    currentNode: [],
    isClickable: true,
    isPlaying: false,
    generation: 0,
    paused: false,
    preset: "none",
    viewportWidth: this.props.viewportWidth
  };
  componentWillMount() {
    this.setState({ viewportWidth: window.innerWidth });
  }
  componentDidMount() {
    let currentNode = [];
    for (let i = 0; i < this.state.cells; i++) {
      currentNode.push({ id: i, isLiving: false });
    }
    this.setState({ currentNode });
  }

  toggleCellLife = id => {
    if (this.state.isClickable) {
      this.setState(prevState => {
        return {
          currentNode: prevState.currentNode.map(cell => {
            if (cell.id === id) {
              cell.isLiving = !cell.isLiving;
              return cell;
            } else {
              return cell;
            }
          })
        };
      });
    }
  };

  killCell = () => {
    this.isLiving = false;
  }

  giveLife = () => {
    this.isLiving = true;
  }

  handleChange = event => {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  // START GAME HANDLER
  handleStartGame = () => {
    this.setState({
      isClickable: false,
      isPlaying: true,
      generation: this.state.generation,
      paused: false
    });
    this.generationCounter = setInterval(
      () =>
        this.setState({
          generation: this.state.generation + 1
        }),
      1000
    );
    this.playGame();
  };
  // PLAY GAME 
  playGame = () => {
    console.log('test')
    let nextNode = this.state.currentNode.slice();
    let length = nextNode.length;
    console.log(length);
    
    for (let i = 0; i < length; i++) {
      if (!nextNode[i].isLiving) {
        let check = 0;
        console.log("He ded")
      }
    }
  }
  
  // Todo
  handlePauseGame = () => {};

  handleResetGame = () => {
    this.setState({
      currentNode: this.state.currentNode.map(cell =>
        cell.isLiving ? !cell.isLiving : cell
      ),
      isClickable: true,
      isPlaying: false,
      generation: 0
    });
    clearInterval(this.generationCounter);
  };

  render() {
    console.log(this.state);
    return (
      <>
        <GenerationText><span role="img" aria-label="spiral">🌀</span> Generation: {this.state.generation}</GenerationText>
        <CellGrid>
          {this.state.currentNode.map((cell, index) => (
            <Cell
              key={index}
              id={cell.id}
              isLiving={cell.isLiving}
              toggleCellLife={this.toggleCellLife}
              viewportWidth={this.state.viewportWidth}
            />
          ))}
        </CellGrid>
        <ControlButton onClick={this.handleStartGame}><span role="img" aria-label="play">▶️</span> Play</ControlButton>
        <ControlButton onClick={this.handlePauseGame}><span role="img" aria-label="pause">⏸</span> Pause</ControlButton>
        <ControlButton onClick={this.handleResetGame}><span role="img" aria-label="reset">🔄</span> Reset</ControlButton>
        <ControlSelect
          value={this.state.preset}
          onChange={this.handleChange}
          name="preset"
        >
          <option value="none">🎛 Preset: None</option>
          <option value="glider">🎛 Preset: Glider</option>
          <option value="random">🎛 Preset: Random</option>
          <option value="blinker">🎛 Preset: Blinker</option>
        </ControlSelect>
      </>
    );
  }
}
Canvas.defaultProps = {
  viewportWidth: "600"
};

export default Canvas;
