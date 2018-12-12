import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <button>random</button>
        <button>start</button>
        <button>stop</button>
        <button>clear</button>
      </div>
    );
  }
}

export default Menu;