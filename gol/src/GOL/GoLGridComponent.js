import React, { Component } from 'react';
import p5 from 'p5';
import P5Wrapper from '../P5Wrapper/P5Wrapper';
import sketch from './GridSketch';

class Grid extends Component {
  constructor(props){
    super(props);
    this.state = {
      sketchy: sketch,
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