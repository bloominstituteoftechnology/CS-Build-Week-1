import React, { Component } from 'react';

import styled from 'styled-components';

const Container = styled.div`
    width: 22px;
    height: 22px;
    border: 1px solid black;
`;

class GridBox extends Component {
    constructor(props) {
        super();
        this.state = {
            alive: false
        }
    }

    render() {
        return (
            <Container>
            </Container>
        )
    }
}

export default GridBox;