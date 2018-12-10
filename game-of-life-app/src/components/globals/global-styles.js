import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

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
    color: #5334F5;
    font-weight: 600;
}

.active {
    font-weight: 700;
    color: rgba(22, 23, 26, 1);
}
`

export const StyledSection = styled.section`
    margin: 0 auto;
    padding: 5rem;
    max-width: 920px;
`