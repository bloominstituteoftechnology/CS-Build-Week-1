import React, { Component } from 'react';

class Cell extends Component {
    state = {
        alive: false
    }

    toggleState = () => {
        const toggle = !this.state.alive
        this.setState({
            alive: toggle
        })
    }



    render() {
        if (this.props.value){
            return (
                <div>
                    TRUE      
                </div>
            );
        } else { 
            return (
                <div>
                    FALSE
                </div>
            )
        }
    }
}

export default Cell;