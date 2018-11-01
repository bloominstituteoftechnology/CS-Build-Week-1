import React from "react";
import "./Cell.css";

let cell_size = 20;

const Cell = props => {
  return (
    <div
      className="Cell"
      style={{
        left: `${cell_size * props.x}px`,
        top: `${cell_size * props.y}px`,
        width: `${cell_size}px`,
        height: `${cell_size}px`
      }}
    />
  );
};

export default Cell;
