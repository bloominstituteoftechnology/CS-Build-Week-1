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
  padding: 1.2rem 3.2rem;
  margin: 1.2rem 1.6rem 0 0;
  background: white;
  border: 1px solid #eee;
  font-size: 1.6rem;
  font-weight: 700;
  outline: none;
  border-radius: 4rem;
  &:focus {
    background: #05f;
    color: white;
  }
`;

class Canvas extends React.Component {
  state = {
    cells: 400,
    gridArr: [],
    isClickable: true,
    generation: 0
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
        <ControlButton>▶️Play</ControlButton>
        <ControlButton>⏸Pause</ControlButton>
        <ControlButton>🔄Reset</ControlButton>
      </>
    );
  }
}

export default Canvas;
