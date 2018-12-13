import React, { Component } from 'react';
import './header.scss';
import GOL from '../GoL_googly.svg';

const Header = (props) => {


  return (
    <div className="header-container">
      <img src={require("../gol.svg")} />
    </div>
  )
};

export default Header;


