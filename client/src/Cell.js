import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      nextState: false
    }
  }

  handleClick = (e) => {
    this.setState({selected: !this.state.selected})
  }

  calcNeighbors = () => {
    let neighbors = 0
    const length = Math.sqrt(this.props.cells.length)
    const row = Math.floor(this.props.id/length)
    const col = this.props.id-(row*length)
    // Calculate neighbors
    if (this.isSelected(row-1, col)) neighbors +=1
    if (this.isSelected(row-1, col+1)) neighbors +=1
    if (this.isSelected(row-1, col-1)) neighbors +=1
    
    if (this.isSelected(row, col+1)) neighbors +=1
    if (this.isSelected(row, col-1)) neighbors +=1
    
    if (this.isSelected(row+1, col)) neighbors +=1
    if (this.isSelected(row+1, col+1)) neighbors +=1
    if (this.isSelected(row+1, col-1)) neighbors +=1
    // Assign nextState
    this.setState({nextState: false});
    if (this.state.selected) {
      if(neighbors < 2) this.this.setState({ nextState: false })
      if(neighbors > 3) this.this.setState({ nextState: false })
      if(neighbors === 3 || neighbors === 2) this.this.setState({ nextState: true })
    } else {
      if(neighbors === 3) this.this.setState({ nextState: true })
    }
  }

  isSelected = (row, col) => {
    const length = Math.sqrt(this.props.cells.length);
    const cell = (row*length)+col
    return this.props.cells[cell].state.selected
  }

  render() { 
    return (
      <div className={this.state.selected?"cell active":"cell"}
        onClick={this.handleClick} >
      </div>
    );
  }
}
 
export default Cell;