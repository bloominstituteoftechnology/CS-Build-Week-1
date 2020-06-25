import React from 'react'
import styled from 'styled-components'

export default function BottomBar(props) {
    return (

        <ButtonWrapper>
            <button onClick={() =>
                props.playGame()
            }>
                Play
            </button>
            <button onClick={()=>props.clearBoard()}>
                Clear the Board
            </button>
            <button onClick={() =>
                props.stopGame()
            }>
                Stop
            </button>

        </ButtonWrapper>

    )
}


const ButtonWrapper = styled.div`
    display:flex;
    justify-content:space-evenly;

`