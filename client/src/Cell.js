import React from 'react';

const Cell = (props) => {
  return (
    <div className={props.value?"cell active":"cell"}
        onClick={() => props.handleClick(props.id)} >
      </div>
  );
}
 
export default Cell;