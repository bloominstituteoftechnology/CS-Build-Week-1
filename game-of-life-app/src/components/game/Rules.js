import React from "react";
import styled from "styled-components";
import { CustomHR } from "../globals/global-styles";

// local styles
const RulesContainer = styled.div`
  border: 1px solid #eee;
  padding: 2rem;
`;
const RulesTitle = styled.h2`
  font-weight: 300;
  color: #4b4b4b;
  font-size: 22px;
`;

export const Rules = () => (
  <RulesContainer>
    <RulesTitle>📜 Rules</RulesTitle>
    <CustomHR />
    <p>
      In the Game of Life, these rules examine each cell of the grid. For each
      cell, it counts that cell's eight neighbors (up, down, left, right, and
      diagonals), and then act on that result.
    </p>
    <ul>
      <li>
        If a cell is <em>alive</em> and it has exactly 2 or 3 neighbors,
        it <em>stays alive.</em>
      </li>
      <li>
        If a cell is <em>dead</em> and it has exactly 3 live neighbors,
        it <em>comes to life.</em>
      </li>
    </ul>
  </RulesContainer>
);
