import React from 'react';

const Cell=(props)=>{
    return <div className='cell' onClick={(e)=>props.getPosition(e)}></div>
}
export default Cell;