import React from 'react'
import {Link} from 'react-router-dom'


const Header = props => (
    <>
        <h1>{props.title}</h1>
        <Link to='/'>Game</Link>
        <Link to='/about'>About</Link>
    </>
)

export default Header;