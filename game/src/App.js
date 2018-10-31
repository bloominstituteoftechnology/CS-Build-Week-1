import React, { Component } from 'react';
import Grid from './components/Grid';
import {Main} from './theme/css';

class App extends Component {
  constructor(props){
    super(props) 
  }

  start = () => {

  }

  pause = () => {

  }

  stop = () => {

  }

  render() {
    return (
      <Main><Grid/>
      </Main>      
    );
  }
}

export default App;
