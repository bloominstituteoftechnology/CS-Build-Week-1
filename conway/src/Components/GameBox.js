import React, { Component } from 'react';

import styled from 'styled-components';
import GridBox from './GridBox';


const Container = styled.div`
    border: 1px solid black;
    width: 362px;
    height: 360px;
    display: flex;
    flex-wrap: wrap;
`;


class GameBox extends Component  {
    constructor(props) {
        super(props);
        const cells = (new Array(225)).fill(0);
        this.state = {
            cells
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.clear == true && prevProps != this.props) {
            let clearedCells = [];
            for (let i=0; i<225; i++) {
                clearedCells.push(0);
            }
            this.setState({cells: clearedCells});
            this.props.clearButton();
        }
    }

    toggleCell = (id) => {
        const cells = this.state.cells;
        cells[id] = (cells[id] + 1) & 1;
        this.setState({cells});
    }

    gridBoxElements() {
        return this.state.cells.map((cell, i) => {
            return <GridBox status={cell} toggleCell={this.toggleCell} id={i}/>
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

    getNeighbors(index) {
        let top = index - 15;
        let topRight = index - 14;
        let right = index + 1;
        let bottomRight = index + 16;
        let bottom = index + 15;
        let bottomLeft = index + 14;
        let left = index - 1;
        let topLeft = index - 16;
        return [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];
    }

    render() {
        return ( 
            <Container>
                {this.gridBoxElements()}
            </Container>
        );
    }
}
 
export default GameBox;