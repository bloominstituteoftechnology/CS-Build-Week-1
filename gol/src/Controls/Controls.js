import React, { Component } from 'react';
import './controls.scss';

const Controls = (props) => {
  
  return (
    <div className="controls-container">
      <button onClick={()=>{props.goBlast()}}>Go, go, go!</button>
    </div>
  )
  
};

export default Controls;


