import React, { Fragment } from "react";
import { createGlobalStyle } from "styled-components";
import Canvas from "../components/Canvas";
import ControlsMenu from "../components/ControlsMenu/ControlsContainer";
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        font-family: sans-serif;
        font-size: 62.5%;
    }
    body {
        font-size: 1.6rem;
    }
`;

export default () => {
  return (
  <Fragment>
    <GlobalStyle/>
    <Canvas />
    <ControlsMenu />
  </Fragment>
  );
};
