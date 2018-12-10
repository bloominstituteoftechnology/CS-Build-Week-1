import React from "react";
import styled from "styled-components";
// styles
import { StyledSection } from "../globals/global-styles";

// components
import { Rules } from "./Rules";

// local styles
const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  @media(max-width: 684px) {
      grid-template-columns: 1fr;
  }
`;

class Game extends React.Component {
  render() {
    return (
      <>
        <StyledSection>
          <GameContainer>
            <div>
              <p>Hello from game component. Put game grid here.</p>
            </div>
            <Rules />
          </GameContainer>
        </StyledSection>
      </>
    );
  }
}

export default Game;
