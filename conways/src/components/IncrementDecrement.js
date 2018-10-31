import React, { Component } from 'react';
import styled from 'styled-components';


const IncDec = styled.div`
    display: flex;
    flex-flow: row nowrap;
`

const Selector = styled.div`
    display: flex;
    flex-flow: row nowrap;
`


class IncrementDecrement extends Component {
    constructor(props){
        super(props)

        this.state = {
            rows : this.props.rows,
            cols : this.props.cols,

        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.rows !== this.state.rows || nextProps.cols !== this.state.cols) {
            this.setState({ rows: nextProps.rows, cols : nextProps.cols });
          }
    }  

    handleClick = (e) => {
        this.props.clickHandler(e); 
        console.log("this.state.rows Increment/Decrement: ", this.state.rows);
    }

    render(){
        return (
            <IncDec>
                <Selector>
                    Rows
                    <input type="text" readOnly value={this.state.rows}/>
                    <div>
                        <button name={"rows_plus"} onClick={this.handleClick}>+</button>
                        <button name={"rows_minus"} onClick={this.handleClick}>-</button>
                    </div>
                </Selector>
                <Selector>
                    Columns
                    <input type="text" readOnly value={this.state.cols}/>
                    <div>
                        <button name={"cols_plus"} onClick={this.handleClick}>+</button>
                        <button name={"cols_minus"} onClick={this.handleClick}>-</button>
                    </div>
                </Selector>
            </IncDec>
        );
    }
}

export default IncrementDecrement;