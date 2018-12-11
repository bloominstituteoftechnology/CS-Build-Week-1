import React from 'react';
import Grid from './Grid.js';
import Inputs from './Inputs';

class Main extends React.Component {
  render() {
    return (
      <div className='main'>
        <Grid />
        <Inputs />
      </div>
  )}
}

export default Main;
