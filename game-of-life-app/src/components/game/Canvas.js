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

  toggleCellLife = (id) => {
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
     }
   })
  }

  render() {
    console.log(this.state.gridArr)
    return (
      <>
        <GenerationText>🌀 Generation: </GenerationText>
        <CustomHR />
        <CellGrid>
          {this.state.gridArr.map((cell, index) => (
            <Cell key={index} id={cell.id} isLiving={cell.isLiving} toggleCellLife={this.toggleCellLife} />
          ))}
        </CellGrid>
        <CustomHR />
        <button>play</button>
        <button>pause</button>
        <button>reset</button>
      </>
    );
  }
}

export default Canvas;
