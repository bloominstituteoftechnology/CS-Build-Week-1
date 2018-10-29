import React from "react";
import "./Board.css";

const cell_size = 20;
const board_width = 900;
const board_height = 900;

class Board extends React.Component {
  render() {
    return (
      <div>
        <div
          className="Board"
          style={{
            width: board_width,
            height: board_height,
            backgroundSize: `${cell_size}px ${cell_size}px`
          }}
        />
      </div>
    );
  }
}

export default Board;
