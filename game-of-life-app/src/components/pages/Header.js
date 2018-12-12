import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "../globals/global-styles";

export const StyledLink = styled(Link)`
  color: #05f;
  font-weight: 500;
  font-size: 2rem;
  padding: 10px;
  text-decoration: none;
`;

const HeaderContainer = styled.div`
  background: white;
  position: fixed;
  width: 100vw;
      box-shadow: rgba(72, 76, 87, 0.1) 0px 1px 3px;
  display: grid;
  height: 6rem;
  @media (max-width: 684px) {
    height: auto;
  }
`;
const HeaderBar = styled.div`
  text-align: center;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(1, 1fr minmax(500px, 1fr));
  margin: 0 auto;
  max-width: 1000px;
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr minmax(400px, 1fr));
  }
  @media (max-width: 684px) {
    grid-template-columns: 1fr;
  }
`;
const HeaderLogoText = styled.h1`
  justify-self: start;
  padding-left: 4rem;
  display: grid;
  @media (max-width: 684px) {
    justify-self: center;
    padding: 2rem 0 1rem;
  }
`;
const LinkGroup = styled.h2`
  justify-self: end;
  align-items: center;
  padding-right: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 684px) {
    justify-self: center;
    padding: 1rem 0 2rem;
  }
`;

const PageLink = styled(Link)`
  font-weight: 300;
  text-decoration: none;
  color: #000;
  margin: 0 0 0 2rem;
  font-size: 1.6rem;
  @media (max-width: 684px) {
    margin: 0 2rem;
  }
`;

const HeaderLogoLink = styled(Link)`
  color: #05f;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.6rem;
  align-self: center;
`;

const Header = props => (
  <>
    <GlobalStyle />
    <HeaderContainer>
      <HeaderBar>
        <HeaderLogoText>
          <HeaderLogoLink to="/"><span role="img" aria-label="flag">🏁 </span>{props.title}</HeaderLogoLink>
        </HeaderLogoText>
        <LinkGroup>
          <PageLink to="/">
            Game
          </PageLink>
          <PageLink to="/about" exact="true">
            About
          </PageLink>
          <PageLink to="/credits" exact="true">
            Credits
          </PageLink>
        </LinkGroup>
      </HeaderBar>
    </HeaderContainer>
  </>
);

export default Header;
