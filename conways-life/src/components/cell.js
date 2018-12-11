import React, { Component } from 'react';
import './cell.css';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlive: this.props.isAlive,
      isClickable: this.props.isClickable
    };
  }

  clickHandler = event => {
    console.log('click: ' + this.state.isAlive);
    this.setState({ isAlive: !this.state.isAlive });
  };

  render() {
    return (
      <div
        style={{ backgroundColor: this.state.isAlive ? 'yellow' : 'white' }}
        className="cell"
        onClick={this.clickHandler}
      />
    );
  }
}
