import React from 'react';
import './cell.css';

const Cell = props => {
  return (
    <div
      style={{
        backgroundColor: props.isAlive ? 'yellow' : 'white',
        cursor: props.isClickable ? 'pointer' : 'not-allowed'
      }}
      className="cell"
      onClick={() => props.cellClickHandler(props.id)}
    />
  );
};

export default Cell;
