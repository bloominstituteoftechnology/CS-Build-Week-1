import React, { Component } from 'react';
import '../styles/Panel.css';

class Panel extends Component {
  render() { 
    return (
      <div className='Panel'>
        <span>{this.props.gens} Generation</span>
        <span>{this.props.speed}ms Speed</span>
        <div className='button' onClick={this.props.toggleRun}>Start/Stop</div>
        <div className='button' onClick={this.props.handleClear}>Clear</div>
      </div>
    )
  }
}
 
export default Panel;