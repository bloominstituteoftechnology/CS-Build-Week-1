import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <div className="controls">
        <div className="controls__button-container">
          <button className="controls__button">
            <FontAwesomeIcon icon="play" />
          </button>
          <button className="controls__button">
            <FontAwesomeIcon icon="stop" />
          </button>
          <button className="controls__button">
            <FontAwesomeIcon icon="step-forward" />
          </button>
          <button className="controls__button">
            <FontAwesomeIcon icon="eraser" />
          </button>
          <button className="controls__button">
            <FontAwesomeIcon icon="question" />
          </button>
        </div>
        <div className="controls__generation"><span className="controls__generation-number">0</span> Generation</div>
      </div>
    );
  }
}
