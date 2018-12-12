import React, { Component } from 'react';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            x: this.props.x,
            y: this.props.y
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
      }
      

    handleToggle = () => {
        if (this.props.animation === 0) {
            if (this.state.value === 1) {
                this.setState({value: 0}); 
                this.props.updateGrid(0, this.state.x, this.state.y);
            } else {
                this.setState({value: 1});
                this.props.updateGrid(1, this.state.x, this.state.y); 
            }
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