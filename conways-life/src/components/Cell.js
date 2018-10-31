import React, { Component } from 'react';

class Cell extends Component {
  selectCell = () => {
    this.props.selectCell(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.cellClass}
        id={this.props.id}
        onClick={this.selectCell}
      />
    );
  }
}

export default Cell;