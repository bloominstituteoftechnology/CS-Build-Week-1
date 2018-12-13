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
      <div>Conway's "Game of Life" is a simulation created by a mathematician named John Conway.  The simulation is to display, in real-time, the ebb and flow of life and death. "Cells" represent living or dead entities.  And those entities live or die accord to the number of "neighbors they have.  In this instance of the <i>Game of Life</i>, I cell dies if:</div>
      <ul>
        <li>a cell's qty of neighbors is <i>&gt;3</i> or <i>&lt;two</i></li>
      </ul>
      <ol>
        <li></li>
      </ol>
    </div>
  )
};

export default Instructions;


