import React, { Component } from 'react';

class Buttons extends Component {
  
  render() {
    return (
      <div classname="buttons">
        <button onClick={this.props.start}>Start</button>
        <button onClick={this.props.stop}>Stop</button>
        <button>Clear</button>
      </div>
    );
  }
}

export default Buttons;