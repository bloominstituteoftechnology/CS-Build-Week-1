import React, { Fragment } from "react";
import { createGlobalStyle } from "styled-components";
import Canvas from "../components/Canvas";
import ControlsMenu from "../components/ControlsMenu/ControlsContainer";
import HeaderPanel from "../components/PresetSection/HeaderPanel";
import CarouselPanel from "../components/PresetSection/CarouselPanel";
import { colors } from "../utils/variables";
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        height: 100%;
    }
    html {
        font-family: sans-serif;
        font-size: 62.5%;
        color: ${colors.white};
    }
    body {
        font-size: 1.6rem;
    }
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }
`;

export default () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Canvas />
      <ControlsMenu />
      <HeaderPanel />
      <CarouselPanel />
    </Fragment>
  );
};
