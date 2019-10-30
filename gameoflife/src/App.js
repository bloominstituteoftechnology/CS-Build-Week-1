import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';
import './App.css';
import GridContainer from './components/gridContainer';
import Details from './components/details';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <div className='banner'>
            <div className='game-title'>Game of Life by Vance Leon</div>
            <div className='nav-bar'>
              <Link to={'/description'} className='links'>
                Game of Life Rules
              </Link>
            </div>
            <Route exact path='/description'>
              <Details />
            </Route>
          </div>
          <div className='game-container'>
            <GridContainer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
