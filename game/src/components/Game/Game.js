import React, { Component } from 'react';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <canvas className="game">
      </canvas>
    );
  }
}
