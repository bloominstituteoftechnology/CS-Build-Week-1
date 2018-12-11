import React from "react";
import styled from "styled-components";
// styles
import { StyledSection } from "../globals/global-styles";
import { CustomHR } from "../globals/global-styles";

// components
import { Rules } from "./Rules";

// local styles
const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 3.2rem;
  @media(max-width: 684px) {
      grid-template-columns: 1fr;
  }
`;

const GameGrid = styled.div`
  border: 1px solid #eee;
  padding: 2rem;
`
const GenerationText = styled.h2`
  font-weight: 700;
  color: #000;
  font-size: 1.6rem;
`;

class Game extends React.Component {
  render() {
    return (
      <>
        <StyledSection>
          <GameContainer>
            <GameGrid>
              <GenerationText>Generation: </GenerationText>
              <CustomHR />
            </GameGrid>
            <Rules />
          </GameContainer>
        </StyledSection>
      </>
    );
  }
}

export default Game;
