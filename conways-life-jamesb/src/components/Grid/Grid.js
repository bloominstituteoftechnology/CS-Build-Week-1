import React from 'react';
import styled from 'styled-components'
import Cell from '../Cell/Cell'



export default function Grid(props) {
    return (
        <GridContainer>
            {props.currentGrid.map(eachRow => {
                return eachRow.map(eachCell => {
                    return (
                        <Cell 
                        cell={eachCell}
                        key={`X:${eachCell.xVal}, Y:${eachCell.yVal}`}
                        size={props.size}
                        />
                    )
                })
            })}
        </GridContainer>
        
    )
}


const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    // background-color: blue;
    margin: 20px auto;
    padding: 20px 20px;
    width: 1000px;
    height: 1000px
`;