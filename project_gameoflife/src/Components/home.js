import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const home = () => {

    return (
        <div className="home-container">
          <div className="homepage">
            <h1 className="homepage-header">Welcome</h1>
            <p className="homepage-content-a">This app was created to showcase the game called Game of Life and to understand Cellular Automata.</p>
           	   <button><a href="http://pi.math.cornell.edu/~lipa/mec/lesson6.html">Click here for more inform</a></button>
           	<h4 className="homepage-content">Ready to get started? </h4>
            	<div className="home-button">
                <Link to='/Grid'><button className="ready-button">Play</button></Link>
           	 </div>
          </div>
        </div>
    )}


export default home;
