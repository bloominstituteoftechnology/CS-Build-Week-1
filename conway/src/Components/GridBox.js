import React, { Component } from 'react';

import styled from 'styled-components';

const Container = styled.div`
    width: 22px;
    height: 22px;
    border: 1px solid black;
    background: white;
`;

class GridBox extends Component {
    constructor(props) {
        super(props);
        console.log(`PROPS: ${this.props.status}`)
        this.state = {
        }
    }

    toggleColor() {
        const cellStatus = this.props.status;
        if (cellStatus === 1) {
            document.getElementById('cell').style.background = 'black';
        } else {
            document.getElementById('cell').style.background = 'white'; 
        }
    }

    render() {
        return (
            <Container id='cell' onClick={this.toggleColor()}>
            </Container>
        )
    }
}

export default GridBox;