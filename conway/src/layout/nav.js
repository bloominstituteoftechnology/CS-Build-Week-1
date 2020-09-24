import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Nav(){
    return (
        <div className="Nav">
          <NavLink to="/">Game</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
    )
}