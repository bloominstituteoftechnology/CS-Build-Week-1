import React from "react";
import styled from "styled-components";

// styles
import { StyledSection } from "../globals/global-styles";

// components
import { Rules } from "./Rules";
import Canvas from "./Canvas";

// local styles
const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 3.2rem;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const GameGrid = styled.div`
  border: 1px solid #eee;
  padding: 2rem;
`;

class Game extends React.Component {
  render() {
    return (
      <>
        <StyledSection>
          <GameContainer>
            <GameGrid>
              <Canvas props={this.props} />
            </GameGrid>
            <Rules />
          </GameContainer>
        </StyledSection>
      </>
    );
  }
}

export default Game;
