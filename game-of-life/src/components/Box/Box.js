import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
      />
    );
  }
}

export default Box;