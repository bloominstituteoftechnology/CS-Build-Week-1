import React, { Component } from 'react';

import styled from "styled-components";

const Block = styled.div`
background-color: black;
width: 20px;
height: 20px;
box-sizing: border-box;
border: 1px solid white;
border-radius: 50%;

`

const GridContainer = styled.div`



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