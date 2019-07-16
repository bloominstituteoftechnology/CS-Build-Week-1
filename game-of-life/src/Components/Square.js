import React, { Component } from 'react';

class Square extends Component {
    state ={
        alive = false,
        isClickable = true,
        neighbors = [],
        generation = 1
    }

    toggleState = () => {
        const toggle = !this.state.alive
        this.setState({
            alive: toggle
        })
    }



    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Square;