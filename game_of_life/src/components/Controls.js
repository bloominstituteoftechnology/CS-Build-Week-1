import React from 'react'

const Controls = props => {
    return (
        <div>
            <button className='start-button' onClick={() => props.setIsRunning(!props.isRunning)}>{props.isRunning ? 'Stop' : 'Start'}</button>
        </div>
    )
}

export default Controls