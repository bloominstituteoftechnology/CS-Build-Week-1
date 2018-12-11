import React, { Component } from 'react';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.cell,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.cell });
      }

    handleToggle() {
        if (this.state.value === 1) {
            this.setState({value: 0});
        } else {
            this.setState({value: 1});
        }
    }

    render() {
        return (
            <div className="cell"
                onClick={() => this.handleToggle()}
                style={ this.state.value === 1 ? { background: "blue" } : null }>
            </div>
          );
        }
}

export default Cell;