import React from 'react';
import {Link} from 'react-router-dom';
import "./Home.css";



class Home extends React.Component {
    render() {
      return (
        <div className="Homepage">
 
        <div>
        <h2>Go Play!</h2>
        <Link to='/Game' className="game-link"><button className="play-button">Play Game!</button></Link></div>
        <div>
            <h3>Rules of the Game</h3>
                <p>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</p>
                <p>Any live cell with two or three live neighbors lives on to the next generation.</p>
                <p>Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
                <p>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</p>
            </div>
        <div>
            <h3>About</h3>
            <p>The Game of Life is a cellular automation created by John Horton Conway in 1970. Although it is called a game, it actually has zero players. The player participates in setting the initial state, and then the evolution of the patterns begins. The general setup is a grid with cells showing as 'alive' or 'dead'.</p>
            </div>
        </div>

      );
    }
  }
  
  export default Home;