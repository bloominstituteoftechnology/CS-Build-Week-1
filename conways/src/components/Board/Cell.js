import React, { Component } from 'react';
import "./Cell.css";
class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: false,
        }
    }

    toggleAlive = e => {
        if (this.props.clickEnabled) {
            this.setState({currentState: !this.state.currentState})
        }
    }
    render() {
        return (
            <div className={`cell + ${this.state.currentState}`} onClick={() => this.toggleAlive()}>
            </div>
        );
    }
}

export default Cell;