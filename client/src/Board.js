import React from 'react';
import Cell from './Cell';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: []
    }
  }

  componentDidMount() {
    var cells = [];
    for (let i=0; i<400; i++) {
      cells.push(<Cell id={i} cells={cells} />)
    }
    this.setState({ cells });
  }

  render() { 
    return (
      <div className='board'> {this.state.cells} </div>
    );
  }
}
 
export default Board;