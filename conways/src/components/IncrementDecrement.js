import React, { Component } from 'react';

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
            <div>
                <div>
                    <input type="text" readOnly value={this.state.rows}/>
                    <div>
                        <button name={"rows_plus"} onClick={this.handleClick}>+</button>
                        <button name={"rows_minus"} onClick={this.handleClick}>-</button>
                    </div>
                </div>
                <div>
                    <input type="text" readOnly value={this.state.cols}/>
                    <div>
                        <button name={"cols_plus"} onClick={this.handleClick}>+</button>
                        <button name={"cols_minus"} onClick={this.handleClick}>-</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default IncrementDecrement;