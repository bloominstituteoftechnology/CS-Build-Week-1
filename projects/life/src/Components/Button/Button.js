import React, { Component } from 'react';
import './button.css';

class Button extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.props.handleClick}>
          {this.props.label}
        </button>
      </div>
    );
  }
}

export default Button;
