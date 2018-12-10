import React from 'react';
import styled from 'styled-components';
import './Cell.css';

const Button = styled.button`
    height: 100px;
    width: 100px;
    border: 1px solid black;
    margin: none;
    outline: none;
`

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            alive: false,
        }
    }
    handleClick = e => {
        e.preventDefault();
        this.setState({alive: !this.state.alive});
    }
    render(){
        let status = this.state.alive? 'alive' : 'dead';
        return(
            <Button className={status} onClick={this.handleClick}/>
        )
    }
}

export default Cell;