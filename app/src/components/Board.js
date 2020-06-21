import React from 'react';
import styled from 'styled-components'
import Row from './Row'



export default function Board(props) {
    return (
        <BoardWrapper>
            {props.currentBoard.map((arr, idx) => {
                return (
                    <Row
                        key={`${idx}`}
                        arr={arr}
                    />
                )
            })}
        </BoardWrapper>

    )
}


const BoardWrapper = styled.div`

`;

