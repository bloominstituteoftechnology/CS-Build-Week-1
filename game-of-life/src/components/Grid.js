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
    refresh=() => {
        console.log("before for")
        for(let i = 0; i < this.props.neighbors.length; i++) {
            console.log(i)
            if(this.props.neighbors.length < 2) {
                this.props.data = 0;
            }
        }
    } 
    render() { 
        return ( 
            <div onClick={this.props.onClick} className={this.props.data ? "Block_On"  : "Block"}>{this.refresh}</div>


    
        );
    }
}
 
export default Grid;