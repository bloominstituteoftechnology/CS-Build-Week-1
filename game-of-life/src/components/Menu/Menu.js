import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <button onClick={this.props.generateRandom}>random</button>
        <button onClick={this.props.playGame}>start</button>
        <button onClick={this.props.increaseSpeed}>+</button>
        <button onClick={this.props.decreaseSpeed}>-</button>
        <button onClick={this.props.stopGame}>stop</button>
        <button onClick={this.props.clearGrid}>clear</button>
      </div>
    );
  }
}

export default Menu;