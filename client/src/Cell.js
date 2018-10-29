import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      nextState: false
    }
  }

  handleClick = (e) => {
    this.setState({selected: !this.state.selected})
  }

  render() { 
    return (
      <div className={this.state.selected?"cell active":"cell"}
        onClick={this.handleClick} >
      </div>
    );
  }
}
 
export default Cell;