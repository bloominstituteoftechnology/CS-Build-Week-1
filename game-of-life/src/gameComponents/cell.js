import React from 'react';

const Cell=(props)=>{
    return <div className='cell' onClick={()=>props.toggle()}></div>
}
export default Cell;