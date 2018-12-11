import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

// Global styles injection - see layout render for implementation info
export const GlobalStyle = createGlobalStyle`
html {
    font-size: 62.5%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    line-height: 1.4;
    font-size: 1.6rem;
    margin: 0;
}

h1, h2, h3 {
    margin: 0;
}

a {
    color: #05f;
    font-weight: 300;
    padding-left: .6rem;
    text-decoration: none;
}

ul {
    padding: 0 1rem 2rem 2rem;
    font-weight: 300;
}

li {
    padding: 1rem 0;
}

p {
    font-weight: 300;
    padding: .8rem 0;
}

.active {
    font-weight: 700;
    color: #05f;
}
`;

export const StyledSection = styled.section`
  margin: 0 auto;
  padding: 9.2rem 3.2rem 3.2rem 3.2rem;
  text-align: ${props => (props.center ? "center" : "left")};
  max-width: 920px;
  @media (max-width: 684px) {
      padding-top: 12.4rem;
  }
  h1 {
    font-size: 6rem;
    text-align: center;
    padding: 2.4rem 0 1.2rem 0;
    @media (max-width: 684px) {
      font-size: 3.2rem;
      padding: 1.6rem 0 .8rem 0;
    }
  }
`;

export const CustomHR = styled.hr`
  color: #eee;
  border: 0.5px solid #eee;
`;
