import React, { Component } from 'react';


class Grid extends Component {

    render() {
        return (
            <div onClick={this.props.onClick} className={this.props.data ? "Block_On" : "Block"} />
        );
    }
}

export default Grid;