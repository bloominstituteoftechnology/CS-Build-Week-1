import React from "react"
import styled from "styled-components"

export default function PresetBoard(props) {

    return (
        <PresetBoardWrapper>
            <div>

                <button onClick={() => props.randomBoard()}>
                    Random Preset
            </button>
            </div>
            <div>

                <button onClick={() => {
                    props.stopGame()
                    props.boardResize(15)
                }}>
                    15 X 15
            </button>
            </div>
            <div>

                <button onClick={() => {
                    props.stopGame()
                    props.boardResize(25)
                }}>
                    25 X 25
            </button>
            </div>
        </PresetBoardWrapper>
    )

}

const PresetBoardWrapper = styled.div`
border: 2px solid blue;
display:flex;
flex-direction:column;
align-items: space-around

`