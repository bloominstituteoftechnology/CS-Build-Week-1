import React, { Component } from 'react';
import { connect } from 'react-redux';

import { currentState } from '../actions/';

import Control from './control';
import Cell from './cell';

console.log(Control);
class Board extends Component {
  render(){
    return(
      <div>
        <table>
          <tbody>
            {this.props.board.map((row,i) =>
              <tr key={i}>{row.map((cell, j) =>
                <Cell
                  key={j}
                  alive={cell.status}
                  newBorn={cell.newBorn}
                  running={Control.props.playState.isRunning ? cell.running : ''}
                  handleClick={() => this.props.currentState(i,j)} 
                />)}
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ board }) => {
  return { board };
}

const mapDispatchToProps = (dispatch) => {
  return { currentState: (x,y) => dispatch(currentState(x,y)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
