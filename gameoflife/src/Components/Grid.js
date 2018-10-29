import React from 'react';
import Styled from 'styled-components';
import Cell from "./Cell";

const GridBox = Styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 800px;
    width: 800px;
    border: 2px solid black;
`;

class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cells: []
        }
    }

    getInitialState =() => {
        let c = [];
        for(let i=0; i < 2500; i++) {
            c.push(<Cell key={i} id={i} clearGrid={this.props.clearGrid} clear={this.props.clear}/>)
        }
        this.setState({cells: c});
    }

    componentDidMount() {
        this.getInitialState();
    }
        
    render() {
   
        return (
            <GridBox>
                {this.state.cells.map(cell => {
                    return <Cell/>
                })}
            </GridBox>
        )        
    }
}

export default Grid;