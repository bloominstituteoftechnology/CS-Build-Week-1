import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome(props) {
  return (
    <div className="Welcome">
      <div className="WelcomeInner">
        <h1>Welcome to Jordan's Game of Life</h1>
        <Link to='/gameoflife'><button>Go to the Game!</button></Link>
        <Link to='/rules'><button>Rules of the Game</button></Link>
        <Link to='/about'><button>About the Game</button></Link>
      </div>
    </div>
  )
}
