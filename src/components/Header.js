import React from 'react';
import '../styles/Header.css';

const Header = (props) => {
  return (
    <div className='header'>
      <h1 className='title'>Conway's Game of Life</h1>
      <div className='icon' onClick={props.handleRules}>Rules</div>
      <div className='button' onClick={() => props.handleSpeed(250)}>250 ms Speed</div>
      <div className='button' onClick={() => props.handleSpeed(500)}>500 ms Speed</div>
      <div className='button' onClick={() => props.handleSpeed(1000)}>1000 ms Speed</div>
      <div className='icon' onClick={props.handleAlgHist}>Algorithm</div>
      <div className='label'>Choose a Generation Speed</div>
    </div>
  );
}
 
export default Header;