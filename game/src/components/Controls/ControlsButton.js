import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ControlsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: this.props.icon,
      isShowingPlay: false
    };
  }

  onButtonClick = e => {
    e.preventDefault();
    this.props.onButtonClick();
    if (this.state.icon === 'play' || this.state.icon === 'stop') {
      if (this.state.isShowingPlay) {
        this.setState({icon: 'stop', isShowingPlay: false});
      } else {
        this.setState({icon: 'play', isShowingPlay: true});
      }
    }
    console.log('button click');
  };

  render() {
    let icon;
    if (this.state.icon === 'play') {
      icon = <FontAwesomeIcon icon={this.state.icon} />;
    } else {
      icon = <FontAwesomeIcon icon={this.state.icon} />;
    }

    return (
      <button className='controls__button' onClick={e => this.onButtonClick(e)}>
        {icon}
      </button>
    );
  }
}