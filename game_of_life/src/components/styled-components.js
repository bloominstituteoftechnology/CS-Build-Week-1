import styled from 'styled-components'
export const Square = styled.div`
    width: 15px;
    height: 15px;
    border: 1px solid black;
    background-color:${props => props.value ? 'blue' : 'white'};
`
export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, 15px);
`