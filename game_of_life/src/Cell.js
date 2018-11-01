import React from 'react';
import styled from 'styled-components';

const CellDiv = styled.div`
  background: #ccc;
  position: absolute;
`;

const CELL_SIZE = 25;

class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
    return (
      <CellDiv
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
      />
    );
  }
}

export default Cell;
