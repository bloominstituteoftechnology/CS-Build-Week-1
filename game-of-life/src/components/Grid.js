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
    render() { 
        return ( 
            <div onClick={this.props.onClick} className={this.props.data ? "Block_On"  : "Block"}  />

    
        );
    }
}
 
export default Grid;