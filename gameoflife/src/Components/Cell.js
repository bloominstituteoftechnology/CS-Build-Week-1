import React from "react";
import Styled from "styled-components";

const Square = Styled.div`
    height: 14px;
    width: 14px;
    border: 1px solid black;
    
`;

class Cell extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alive: false,
            dead: true
        }
    }

    toggleCell = () => {
        this.setState({alive: !this.state.alive, dead: !this.state.dead})
    }

    componentDidMount() {
        if(this.props.clear) {
            this.setState({alive: false, dead: true})
        }
    }

    render(){
        return (
            <Square style={{backgroundColor: this.state.alive ? 'orange' : 'gray'}} onClick={this.toggleCell}/>
        )
    }
}

export default Cell;