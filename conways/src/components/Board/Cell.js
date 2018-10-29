import React, { Component } from 'react';
import "./Cell.css";
class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className={`cell + ${this.props.index.alive}`} onClick={() => this.props.toggleClick(this.props.index)}>
            </div>
        );
    }
}

export default Cell;