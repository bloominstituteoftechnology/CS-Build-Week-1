import React from 'react';

 function Inputs (props) {
  return (
    <div className='inputs'>
      {props.isPlaying ? <button onClick={props.startHandler}>Stop</button> :
      <button onClick={props.startHandler}>Start</button>
    }
    </div>
  )
}

export default Inputs;
