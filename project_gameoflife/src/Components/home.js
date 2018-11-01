import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const home = () => {

    return (
        <div>
          <div className="homepage">
            <h1 className="homepage-header">Welcome to Lambda Notes</h1>
            <p className="homepage-content-a">This is an app that creates short notes where you can store and retrieve when you want them.</p>
           	<h4 className="homepage-content">Ready to get started? </h4>
            	<div className="home-button">
                <Link to='/Grid'><button className="home-login-button">Ready to Play</button></Link>
           	 </div>
          </div>
        </div>
    )}


export default home;
