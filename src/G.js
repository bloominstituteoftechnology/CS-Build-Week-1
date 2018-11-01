import './g.css';
import C from './C';

import React, { Component } from 'react';



class G extends Component {

  


  render() {
      const width = this.props.cols * 16;
      var rowsArr = [];
      
      var cellClass = "";
      for(var i=0; i<this.props.rows; i++) {
          for(var j = 0; j< this.props.cols; j++) {
              let cellId = i + "_" + j;

              cellClass = this.props.gridFull[i][j] ? "cell alive" : "cell dead";
              rowsArr.push(
                  <C
                  cellClass={cellClass}
                  key={cellId}
                  boxId={cellId}
                  row={i}
                  col={j}
                  selectCell={this.props.selectCell}
                  />
              );

          }
      }
    return (
      
        <div className="grid" style={{width: width}}>
        {rowsArr}
        </div>
      
    )
}
}
 
export default G;