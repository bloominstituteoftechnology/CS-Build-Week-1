import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';


const home = () => {

    return (
        <div className="home-container">
          <div className="homepage">
            <h1 className="homepage-header">Welcome</h1>
              <h1 className="App-title">John Conway's Game of Life</h1>
            <p className="homepage-content-a">This app was created to showcase the game called Game of Life and to understand Cellular Automata.</p>
            	<h3>Game Description</h3>
            <p>The Game of Life (an example of a cellular automaton) is played on an infinite two-dimensional rectangular grid of cells. Each cell can be either alive or dead. The status of each cell changes each turn of the game (also called a generation) depending on the statuses of that cell's 8 neighbors. Neighbors of a cell are cells that touch that cell, either horizontal, vertical, or diagonal from that cell.
						</p>
						<h3>Computation</h3>
						<p>It's possible even, to create patterns which emulate logic gates (and, not, or, etc.) and counters. Building up from these, it was proved that the Game of Life is Turing Complete, which means that with a suitable initial pattern, one can do any computation that can be done on any computer. Later, Paul Rendell actually constructed a simple Turing Machine as a proof of concept, which can be found here. Although Rendell's Turing Machine is fairly small, it contains all of the ideas necessary to create larger machines that could actually do meaningful calculations. One of the patterns in Jason Summers' collection will compute prime numbers, and another will compute twin primes (two primes that only differ by adding or subtracting 2).
						</p>
						<p>For more Information about Conway's Game of Life- Check out this article from Cornell.edu</p>
           	   <button><a href="http://pi.math.cornell.edu/~lipa/mec/lesson6.html">Click here</a></button>
           	<div className="ready-container">
           		<div className="homepage-content">
           			<h4 className="homepage-content1">Ready to Play? </h4>
           		</div>

                <Link to='/Grid' className="ready-button1"><button className="ready-button">Play</button></Link>

           	 </div>
          </div>
        </div>
    )}


export default home;
