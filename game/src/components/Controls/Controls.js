import React, { Component } from 'react';
import ControlsButton from './ControlsButton';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
      generationNumber: 0
    };
  }

  onClearClick = e => {
    this.props.clear();
    console.log('clear click');
  };

  onRandomizeClick = e => {
    this.props.randomize();
    console.log('randomize click');
  };

  render() {
    return (
      <div className="controls">
        <div className="controls__button-container">
          <ControlsButton icon="stop" isHidden={true} onButtonClick={this.onClearClick} />
          <ControlsButton icon="step-forward" isHidden={false} onButtonClick={this.onClearClick} />
          <ControlsButton icon="eraser" isHidden={false} onButtonClick={this.onClearClick} />
          <ControlsButton icon="question" isHidden={false} onButtonClick={this.onRandomizeClick} />
        </div>
        <div className="controls__generation"><span className="controls__generation-number">{this.props.generationNumber}</span> Generation</div>
      </div>
    );
  }
}
