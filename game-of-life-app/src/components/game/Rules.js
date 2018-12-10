import React from "react";
//import { StyledSection } from "../globals/global-styles";
// import { GlobalStyle } from "../globals/global-styles";
import styled from 'styled-components'
import {CustomHR} from '../globals/global-styles'

const RulesContainer = styled.div`
    border: 1px solid #eee;
    padding: 2rem;
`
const RulesTitle = styled.h2`
    font-weight: 300;
    color: #4b4b4b;
    font-size: 22px;
`

export const Rules = () => (
  <RulesContainer>
    <RulesTitle>📜 Rules</RulesTitle>
    <CustomHR />
    <p>In the Game of Life, these rules examine each cell of the grid. For each
cell, it counts that cell's eight neighbors (up, down, left, right, and
diagonals), and then act on that result.</p>
    <ul>
    <li>
      If a cell is <strong>alive</strong> and it has exactly 2 or 3 neighbors,
      it <strong>stays alive.</strong>
    </li>
    <li>
      If a cell is <strong>dead</strong> and it has exactly 3 live neighbors, it{" "}
      <strong>comes to life.</strong>
    </li>
    </ul>
  </RulesContainer>
);
