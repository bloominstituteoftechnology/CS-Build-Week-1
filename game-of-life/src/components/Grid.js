import React, { Component } from 'react';

import styled from "styled-components";

// const Block = styled.div`
// background-color: black;
// width: 20px;
// height: 20px;
// box-sizing: border-box;
// border: 1px dashed #d45f;


// `

// const Block_On = styled.div`
// background-color: black;
// width: 20px;
// height: 20px;
// box-sizing: border-box;
// border: 1px dashed #d45f;



// `





class Grid extends Component {
    state = {
        alive: 0
    }

    componentDidMount() {
        this.setState({alive: this.props.data})
    }

    componentDidUpdate() {
        this.logic()
    }
    logic=() => {
        if (this.props.neighbors.length < 2 || this.props.neighbors.length > 3 && this.state.alive !== 0) {
            this.setState({alive: 0});
        } else if (this.props.neighbors.length == 3) {
            if(this.state.alive == 0) {
                this.setState({alive: 1})
            }

        }
    } 
    render() { 
        return ( 
            <div onClick={this.props.onClick} className={this.props.data ? "Block_On"  : "Block"} />


    
        );
    }
}
 
export default Grid;