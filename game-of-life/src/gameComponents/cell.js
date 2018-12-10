import React, { Component } from 'react';

class Cell extends Component {
    constructor(){
        super();
        this.state={
            currentState: null,
            isClickable: true
        }
    }
    toggleState=()=>{
        this.state.currentState===0 ? this.setState({currentState:1}):this.setState({currentState:0});
    }
}
export default Cell;