import React, { Component } from 'react';
import './c.css';

class C extends Component {
    selectCell = () => {
        console.log(this.props.row, "*******")

        this.props.selectCell(this.props.row, this.props.col);
    }
   
    render() {
      return (
        <div   
        className={this.props.cellClass}
        id={this.props.id}
        onClick={this.selectCell}/>
         
        
      );
    }
  }

  export default C;