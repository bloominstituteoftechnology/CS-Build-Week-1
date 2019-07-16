import React from 'react';

import Cell from './Cell';

export default function Grid({ cellData, gridX, gridY }) {
  console.log(cellData);
  return (
    <div>
      {cellData.map((cell, index) => {
        return <Cell key={cell.index} status={cell} />;
      })}
    </div>
  );
}
