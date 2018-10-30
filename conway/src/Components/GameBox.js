import React, { Component } from 'react';

import styled from 'styled-components';
import GridBox from './GridBox';


const Container = styled.div`
    border: 1px solid black;
    width: 362px;
    height: 362px;
    display: flex;
    flex-wrap: wrap;
`;


class GameBox extends Component  {
    constructor() {
        super();
        const cells = (new Array(225)).fill(0);
        this.state = {
            cells
        }
    }

    toggleCell(id) {
        const cells = this.state.cells;
        cells[id] = (cells[id] + 1) & 1;
        this.setState({cells});
    }

    gridBoxElements() {
        return this.state.cells.map((cell, i) => {
            return <GridBox status={cell} onClick={this.toggleCell} id={i}/>
        })
    }

    getCoordinates(index) {
        const y = Math.floor(index / 15);
        const x = index % 15;
        return (x, y);
    }

    getIndex(x, y) {
        return (15 * y) + x;
    }

    // get

    render() {
        return ( 
            <Container>
                {this.gridBoxElements()}
            </Container>
        );
    }
}
 
export default GameBox;