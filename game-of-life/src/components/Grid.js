import React, { Component } from 'react';

import styled from "styled-components";

const Block = styled.div`
background-color: black;
width: 25px;
height: 25px;
box-sizing: border-box;
border: 1px solid white;

`

const GridContainer = styled.div`
display: flex;
`



class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        
        <GridContainer>
        <Block />
        </GridContainer>
        );
    }
}
 
export default Grid;