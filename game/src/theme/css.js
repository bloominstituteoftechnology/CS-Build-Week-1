import styled from 'react-emotion';


// Main Container Styling
const Main = styled('div')`
    max-width: 100%;
    width: 800px;
    height: 500px;
`

// Controls Component Styling
const ControlsWrapper = styled('div')`
    display: flex;
    width: 500px;
    height: 100px;
`

// Styling for creating cells
const Cells = styled('div')`
    display: flex;
    flex: 1;
    padding: 10px;
    margin: 1px;
    border: 1px solid black;
`


export {ControlsWrapper, Cells, Main};