import React from 'react'
import styled from 'styled-components'

export default function TopBar(props){
    return(
        <div>
            <p>
                Generation: {props.currentGeneration}
            </p>
        </div>
    )
}