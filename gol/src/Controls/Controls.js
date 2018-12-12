import React, { Component } from 'react';
import './controls.scss';

const Controls = (props) => {
  
  return (
    <div className="controls-container">
      <button onClick={()=>{props.goBlast()}}>Go, go, go!</button>
      <button onClick={()=>{props.stop()}}>Stop!</button>
    </div>
  )

};

export default Controls;


