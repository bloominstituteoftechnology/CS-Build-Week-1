import React, { Component } from 'react';

import styled from 'styled-components';


const Container = styled.div`
    border: 1px solid black;
    width: 362px;
    height: 300px;
`;


class GameBox extends Component  {
    constructor() {
        super();
        this.state = {
            boxes: []
        }
    }

    render() {
        return ( 
            <Container>
            </Container>
        );
    }
}
 
export default GameBox;