import React, { Component } from 'react';
class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlive: false
        }
    }

    clickHandler() {
    if(this.state.isAlive)
        this.setState({isAlive: false});
    else
        this.setState({isAlive: true});
        this.props.storeCell(this.props.position)
    }

    render() {
      return (
        <div onClick={() => this.clickHandler()} className={this.state.isAlive ? "cell-container-alive" : "cell-container-dead"}></div>
      );
    }
  }

export default Cell;
