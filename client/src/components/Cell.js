import React from 'react';
import '../styles/Cell.css';

const Cell = (props) => {
  return (
    <div className={props.value?"cell active":"cell"}
        onClick={() => props.handleClick(props.id)} >
      </div>
  );
}
 
export default Cell;