import React, { Component } from 'react';
import './App.css';

class Box extends Component {
  render() {
    return (
      <div 
        className={this.props.boxClass}
      />
    );
  }
}

export default Box;