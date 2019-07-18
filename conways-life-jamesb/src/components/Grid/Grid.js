import React from 'react';
import styled from 'styled-components'
import Cell from '../Cell/Cell'



export default function Grid(props) {
    return (
        <GridContainer>
        <div>
            {props.currentGrid.map(eachRow => {
                return eachRow.map(eachCell => {
                    return (
                        <Cell 
                        cell={eachCell}
                        key={`X:${eachCell.xVal}, Y:${eachCell.yVal}`}
                        />
                    )
                })
            })}
        </div>
        </GridContainer>
    )
}


const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    // background-color: blue;
`;