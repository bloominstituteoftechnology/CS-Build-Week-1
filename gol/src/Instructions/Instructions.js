import React, { Component } from 'react';
import './instructions.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'



const Instructions = (props) => {

  window.setTimeout(()=>{
    let hdr = document.querySelector('.instructions-container');
    hdr.classList.add('show-container')
  }, 100);

  return (
    <div className="instructions-container">
      <div>Playing with lives.</div>
      <div>Conway's "Game of Life" is </div>
      <ol>
        <li></li>
      </ol>
    </div>
  )
};

export default Instructions;


