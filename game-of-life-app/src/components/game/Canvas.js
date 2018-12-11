import React from "react";
import styled from "styled-components";
import { CustomHR } from "../globals/global-styles";
import Cell from './Cell'

const GenerationText = styled.h2`
  font-weight: 700;
  color: #000;
  font-size: 1.6rem;
`;

class Canvas extends React.Component {
  state = {
    cells: 400,
    gridArr: [],
    canClick: true,
    generation: 0
  };

  componentDidMount() {
    let gridArr = [];
    for (let i = 0; i < this.state.cells; i++) {
      gridArr.push({ id: i, isLiving: false });
    }
    this.setState({ gridArr });
  }

  render() {
    return (
      <>
        <GenerationText>🌀 Generation: </GenerationText>
        <CustomHR />
        {this.state.gridArr.map((cell, index) => (
          <Cell key={index} id={cell.id} isLiving={cell.isLiving} />
        ))}
        <CustomHR />
        <button>play</button>
        <button>pause</button>
        <button>reset</button>
      </>
    );
  }
}

export default Canvas;
