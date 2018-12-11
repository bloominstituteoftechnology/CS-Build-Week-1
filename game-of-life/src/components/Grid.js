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
    constructor(props) {
        super(props);
        this.state = { activated: 0,
                       grid: []     
        }
    }
    componentDidMount() {
        this.setState({activated: this.props.data,
                        grid: this.props.grid})
    }
    toggleState = (e) => {
        if(this.state.activated == 0) {
            this.setState({activated: 1})
            
        } else {
            this.setState({activated: 0})
        }
    }
    render() { 
        return ( 
            <div onClick={this.toggleState} className={this.state.activated ? "Block_On"  : "Block"}  />
        
        // <Block onClick={this.toggleState} />
        
    
        );
    }
}
 
export default Grid;