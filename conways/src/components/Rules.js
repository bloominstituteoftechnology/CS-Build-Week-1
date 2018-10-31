import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
    border: 2px solid black;
    background-image: linear-gradient(to right, rgba(52, 187, 229, 0.5), rgba(139, 189, 184, 0.8));
    width: 25%;
    position: absolute;
    right: 5%;
    bottom: 5%;
`

const Rule = styled.li`
    font-size: 0.8rem;
`

const Rules = () => {
    return (
        <Info>
           <ol>
               <Rule>Any live cell with fewer than two live neighbors dies, as if by underpopulation.
</Rule>
               <Rule>Any live cell with two or three live neighbors lives on to the next generation.
</Rule>
               <Rule>Any live cell with more than three live neighbors dies, as if by overpopulation.
</Rule>
               <Rule>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
</Rule>
           </ol>
        </Info>
    )
}

export default Rules;