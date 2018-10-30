import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import exitIcon from "./assets/x-circle.svg";
const NavigationWrapper = styled.div`
  display: ${props => (props.menuActive ? "flex" : "none")};
  width: 100%;
  height: 100%;
`;
const Menu = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${colors.black};
  width: 80%;
`;
const BlurBackground = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(58, 56, 56, 56%);
`;

const ExitIcon = styled.img.attrs({
  src: exitIcon
})`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  height: 5rem;
`;

const NavigationContainer = props => {
  return (
    <NavigationWrapper
      menuActive={props.menuActive}
    >
        <BlurBackground
        onClick={() => {
          props.toggleState("menuActive");
      }}/>
      <Menu>
        <ExitIcon
        onClick={() => {
          props.toggleState("menuActive");
      }}/>
      </Menu>
    </NavigationWrapper>
  );
};

export default NavigationContainer;
