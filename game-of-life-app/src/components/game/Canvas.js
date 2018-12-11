import React from "react";
import styled from "styled-components";
import { CustomHR } from "../globals/global-styles";
import Cell from "./Cell";

const GenerationText = styled.h2`
  font-weight: 700;
  color: #000;
  font-size: 1.6rem;
`;

const CellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  grid-gap: 0;
`;

const ControlButton = styled.button`
  padding: .8rem 1.6rem;
  margin: 1.2rem 1.6rem 0 0;
  background: white;
  border: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: 700;
  outline: none;
  border-radius: 4rem;
  &:focus {
    background: #05f;
    color: white;
  }
`;

const Label = styled.label`
  padding: .8rem .4rem;
  font-weight: 700;
  font-size: 1.2rem;
`

class Canvas extends React.Component {
  state = {
    cells: 400,
    gridArr: [],
    isClickable: true,
    generation: 0,
    paused: false,
    preset: 'none'
  };

  componentDidMount() {
    let gridArr = [];
    for (let i = 0; i < this.state.cells; i++) {
      gridArr.push({ id: i, isLiving: false });
    }
    this.setState({ gridArr });
  }

  toggleCellLife = id => {
    if (this.state.isClickable) {
      this.setState(prevState => {
        return {
          gridArr: prevState.gridArr.map(cell => {
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

  handleChange = event => {
    const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }
  handleStartGame = () => {
    this.setState({
      isClickable: false,
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
  };

  // Todo
  handlePauseGame = () => {};

  handleResetGame = () => {
    this.setState({
      gridArr: this.state.gridArr.map(cell =>
        cell.isLiving ? !cell.isLiving : cell
      ),
      isClickable: true,
      generation: 0
    });
    clearInterval(this.generationCounter);
  };

  render() {
    console.log(this.state.gridArr);
    return (
      <>
        <GenerationText>🌀 Generation: {this.state.generation}</GenerationText>
        <CustomHR />
        <CellGrid>
          {this.state.gridArr.map((cell, index) => (
            <Cell
              key={index}
              id={cell.id}
              isLiving={cell.isLiving}
              toggleCellLife={this.toggleCellLife}
            />
          ))}
        </CellGrid>
        <CustomHR />
        <ControlButton onClick={this.handleStartGame}>▶️ Play</ControlButton>
        <ControlButton onClick={this.handlePauseGame}>⏸ Pause</ControlButton>
        <ControlButton onClick={this.handleResetGame}>🔄 Reset</ControlButton>
        <Label>Preset</Label>
        <select value={this.state.preset} onChange={this.handleChange} name="preset">
                    <option value="none">None</option>
                    <option value="glider">Glider</option>
                    <option value="random">Random</option>
                    <option value="blinker">Blinker</option>
        </select>
      </>
    );
  }
}

export default Canvas;
