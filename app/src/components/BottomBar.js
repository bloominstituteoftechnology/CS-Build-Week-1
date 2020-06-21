import React from 'react'
import styled from 'styled-components'

export default function BottomBar() {
    return (

        <ButtonWrapper>
            <button>
                Play
            </button>
            <button>
                Pause
            </button>
            <button>
                Stop
            </button>

        </ButtonWrapper>

    )
}


const ButtonWrapper = styled.div`
    display:flex;
    justify-content:space-evenly;

`