import React from "react";
import { StyledSection } from "../globals/global-styles";
import {StyledLink} from './Header'

export const PageNotFound = () => (
  <>
    <StyledSection center>
      <h1>404 <span>💀</span></h1>
      <StyledLink to='/'>Click here to return to the homepage.</StyledLink>
    </StyledSection>
  </>
);
