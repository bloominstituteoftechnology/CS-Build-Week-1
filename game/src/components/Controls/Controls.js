import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
      generationNumber: 0
    };
  }

  render() {
    return (
      <div className="controls">
        <div className="controls__button-container">
          <button id="playButton" className="controls__button">
            <FontAwesomeIcon icon="play" />
          </button>
          <button id="stopButton" className="controls__button">
            <FontAwesomeIcon icon="stop" />
          </button>
          <button id="stepButton" className="controls__button">
            <FontAwesomeIcon icon="step-forward" />
          </button>
          <button id="clearButton" className="controls__button">
            <FontAwesomeIcon icon="eraser" />
          </button>
          <button id="randomButton" className="controls__button">
            <FontAwesomeIcon icon="question" />
          </button>
        </div>
        <div className="controls__generation"><span className="controls__generation-number">{this.props.generationNumber}</span> Generation</div>
      </div>
    );
  }
}
