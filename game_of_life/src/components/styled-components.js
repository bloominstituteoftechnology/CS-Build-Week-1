import styled from 'styled-components'
export const Square = styled.div`
    width: 15px;
    height: 20px;
    border: 1px solid black;
    background-color:${props => props.value ? 'blue' : 'white'};
`