import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Base
  * ========================================================================== */
  :root {
    --border-radius-primary: 3px;
  }

  html {
    cursor: default;
    box-sizing: border-box;
    background: #000000;
    color: white;
    /*only break work when necessary and add hyphen*/
    overflow-wrap: anywhere;
    word-break: break-word;
    hyphens: auto;
    /*Prevent adjustments of font size Windows Phone/iOS*/
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    /*Remove grey highlight on links in iOS*/
    -webkit-tap-highlight-color: transparent;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    position: relative;
    outline-width: 2.5px;
    outline-color: yellow;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  /* Forms/controls
  * ========================================================================== */
  
  /*block labels to stay above inputs*/
  label {
    display: block;
  }
  
  /*Remove margin and padding, and inherit font on controls*/
  button,
  input,
  select {
    margin: 0;
    padding: 0;
    font: inherit;
  }
  
  /*1rem default for inputs to avoid zoom on ios*/
  input, select {
    font-size: 1rem;
  }
  
  /*Correct the inability to style buttons in iOS and Safari*/
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  /*Remove the inheritance of text transform in Firefox*/
  select {
    text-transform: none;
  }
  
  /*Single taps are dispatched immediately on clickable elements*/
  a,
  button,
  input,
  label,
  [tabindex] {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  /*Button defaults*/
  button {
    border: none;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    background-color: transparent;
  }

  /* a11y/UI
  * ========================================================================== */

  /*visual cursor hints*/
  [aria-busy="true"] {
    cursor: progress;
  }

  [aria-disabled="true"],
  [disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }

  /**
  * Remove the inner border and padding of focus outlines in Firefox.
  */
  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
  * Restore the focus outline styles unset by the previous rule in Firefox.
  */
  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /* Grouping content
  * ========================================================================== */

  /*Remove all margin/padding on lists*/
  ul, ol, li, dl, dd, dt {
    margin: 0;
    padding: 0;
  }

  /*default list styles*/
  ul, ol {
    list-style: none;
  }

  /* Table content
  * ========================================================================== */

  /*Remove all margin/padding on tables*/
  table, caption, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
  }

  /* removes spacing between cells in tables */
  table{
    border-collapse: collapse;
  }

  /* Text-level styles
  * ========================================================================== */

  /*default heading styles*/
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-family: 'Space Mono', monospace;
    color: rgba(248, 205, 218, 0.7);
    text-shadow: 1px 1px 8px rgba(238, 130, 238, 0.7);
  }

  /*center headings*/
  h1, h2, h3 {
    text-align: center;
  }

  /*default text styles*/
  p,
  a,
  button,
  li,
  dd,
  dt,
  label,
  b,
  strong,
  legend {
    margin: 0;
    padding: 0;
    font-family: 'Space Mono', monospace;
  }

  /*line height for text*/
  p, dd, li {
    line-height: 1.5;
  }

  /*bold font weight for titles/important text*/
  b,
  strong,
  dt,
  legend {
    font-weight: bold;
  }

  /* Text-level sizing
  * ========================================================================== */
  p,
  a,
  button,
  li,
  dd,
  dt,
  label,
  b,
  strong,
  legend {
    font-size: 1rem;
  }

  h4 {
    font-size: 1.125rem;

    @media (min-width: 1000px) {
      font-size: 1.2rem;
    }
  }

  h3 {
    font-size: 1.266rem;

    @media (min-width: 1000px) {
      font-size: 1.44rem;
    }
  }

  h2 {
    font-size: 1.424rem;

    @media (min-width: 1000px) {
      font-size: 1.728rem;
    }
  }

  h1 {
    font-size: 1.602rem;

    @media (min-width: 1000px) {
      font-size: 2.074rem;
    }
  }

  /* General styles
  * ========================================================================== */

  .visually-hidden {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
  }

  .hidden {
    display: none;
  }
`;

export const RowFlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.main || "center"};
  align-items: ${(props) => props.cross || "center"};
  gap: ${(props) => props.gap || "0"};
`;

export const Button = styled.button`
  color: rgba(248, 205, 218, 0.8);
  text-shadow: 1px 1px 8px rgba(238, 130, 238, 0.7);
  padding: 10px 20px;
  background-color: rgba(248, 205, 218, 0.1);

  border-radius: var(--border-radius-primary);
  border: 1px solid rgba(238, 130, 238, 0.9);
  box-shadow: 0.5px 0.5px 10px 0.5px rgba(238, 130, 238, 0.3);

  &:hover {
    cursor: pointer;
    background: #134e5e;
    background: linear-gradient(to right, #134e5e, #71b280);
  }
`;
