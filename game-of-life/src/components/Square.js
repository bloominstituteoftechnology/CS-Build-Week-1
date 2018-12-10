import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Square extends Component {
  constructor(props) {
    super(props);
    this.isOn = false;
    this.liveneighbors = 0;
  }
}
