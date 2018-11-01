import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ControlsButton extends Component {
  constructor(props) {
    super(props);
  }

  onButtonClick = e => {
    e.preventDefault();
    this.props.onButtonClick();
    console.log('button click');
  };

  render() {
    return (
      <button className="controls__button" onClick={e => this.onButtonClick(e)}>
        <FontAwesomeIcon icon={this.props.icon} />
      </button>
    );
  }
}