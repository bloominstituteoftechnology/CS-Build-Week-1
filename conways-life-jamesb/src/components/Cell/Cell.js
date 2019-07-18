import React from 'react';
import styled from 'styled-components';

export default function Cell(props) {
    let cellColor = 'white'
    if (props.cell.isAlive) {
        cellColor = 'black'
    } else {
        cellColor = 'white'
    }

    const cellSize = 100/props.size;
    return (
        <CellContainer
            style={{width: `${cellSize}%`, height: `${cellSize}%`, background: `${cellColor}`  }}
        >
            <p>{props.cell.xVal}, {props.cell.yVal} </p>
        </CellContainer>
    )
}


const CellContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    
`