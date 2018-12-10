import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continueAnimation: true;
    }
  }

  componentDidMount() {

  }

  render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    }
}
