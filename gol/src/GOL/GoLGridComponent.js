import React, { Component } from 'react';
import p5 from 'p5';
import P5Wrapper from '../P5Wrapper/P5Wrapper';
import GridSketch from './GridSketch';

class Grid extends Component {
  constructor(props){
    super(props);
    this.state = {
      sketchy: GridSketch,
    }
  }

  

  render(){
    return(
      <div>
        <P5Wrapper sketch={this.state.sketchy}/>
      </div>
    )
  }

}

export default Grid;