import React from "react";
import styled from "styled-components";
import { CustomHR } from "../globals/global-styles";

// local styles
const RulesContainer = styled.div`
  border: 1px solid #eee;
  padding: 2rem;
`;
const RulesTitle = styled.h2`
  font-weight: 700;
  color: #000;
  font-size: 1.6rem;
`;

export const Rules = () => (
  <RulesContainer>
    <RulesTitle>📃 Rules</RulesTitle>
    <CustomHR />
    <p>
      In the Game of Life, these rules examine each cell of the grid. For each
      cell, it counts that cell's eight neighbors (up, down, left, right, and
      diagonals), and then act on that result.
    </p>
    <ul>
      <li>
        If the cell is alive <em>and</em> has 2 or 3 neighbors, then it remains
        alive. Else it dies.
      </li>
      <li>
        If the cell is dead <em>and</em> has exactly 3 neighbors, then it comes
        to life. Else if remains dead.
      </li>
    </ul>
  </RulesContainer>
);
