import React from "react";
import "./Life.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Life extends React.Component {
  render() {
    return (
      <div>
        <div
          className="Board"
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
          }}
        />
      </div>
    );
  }
}
export default Life;
