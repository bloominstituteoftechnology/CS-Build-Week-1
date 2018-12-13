import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const GenerationText = styled.h2`
  font-weight: 700;
  color: #000;
  font-size: 1.6rem;
`;

const CellGrid = styled.div`
  display: grid;
  padding: 1rem 0;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  grid-gap: 0;
`;

const ControlButton = styled.button`
  padding: 0.8rem 1.6rem;
  margin: 1.2rem 1.6rem 0 0;
  background: white;
  min-height: 3.8rem;
  border: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: 700;
  outline: none;
  border-radius: 4rem;
  box-shadow: rgba(72, 76, 87, 0.1) 0px 1px 3px;
  &:hover {
    background: #05f;
    color: white;
  }
`;

const ControlSelect = styled.select`
  background: white;
  border: 1px solid #eee;
  height: 3.8rem;
  padding: 0 1.6rem 0 1.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  width: 13.2rem;
  outline: none;
  box-shadow: rgba(72, 76, 87, 0.1) 0px 1px 3px;
  margin: 1.2rem 1.6rem 0 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const LEFT = [20, 40, 60, 80, 100, 120, 140, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360];

class Canvas extends React.Component {
  state = {
    cells: 400,
    currentNodes: [],
    isClickable: true,
    isPlaying: false,
    generation: 0,
    paused: false,
    preset: "none",
    viewportWidth: this.props.viewportWidth
  };
  componentWillMount() {
    this.setState({ viewportWidth: window.innerWidth });
  }
  componentDidMount() {
    let currentNodes = [];
    for (let i = 0; i < this.state.cells; i++) {
      currentNodes.push({ id: i, isLiving: false });
    }
    this.setState({ currentNodes });
  }

  toggleCellLife = id => {
    if (this.state.isClickable) {
      this.setState(prevState => {
        return {
          currentNodes: prevState.currentNodes.map(cell => {
            if (cell.id === id) {
              cell.isLiving = !cell.isLiving;
              return cell;
            } else {
              return cell;
            }
          })
        };
      });
    }
  };

  // killCell = () => {
  //   this.isLiving = false;
  // };

  // giveLife = () => {
  //   this.isLiving = true;
  // };

  handleChange = event => {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  // START GAME HANDLER
  handleStartGame = () => {
    this.setState({
      isClickable: false,
      isPlaying: true,
      generation: this.state.generation,
      paused: false
    });
    this.generationCounter = setInterval(
      () =>
        this.setState({
          generation: this.state.generation + 1
        }),
      1000
    );
    this.playGame();
  };

  /* 
  EDGE CASES:
  
  TOP 1 - 18
  BOTTOM 381 -399
  LEFT  0, 20, 40, 60, 80, 100, 120, 140, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380
  RIGHT 19, 38, 57, 76, 95, 114, 133, 152, 171, 190, 209, 228, 247, 266, 285, 304, 323, 342, 361, 380
  
  ALL CASES (Other than edge cases)
  [i - 21]        | [i - 20        |  [i - 19]
  -----------------------------------------------
  [i - 1]        |       [21]     |  [i + 1] 
  -----------------------------------------------
  [i + 19]       |      [i + 20]  |   [i + 21]
  */
  // PLAY GAME
  playGame = () => {
    console.log("test");
    let currentNodes = this.state.currentNodes.slice();
    let length = currentNodes.length;
    let endOfArray = currentNodes.length - 1;
    let nextNodes = [];

    for (let i = 0; i < length; i++) {
      nextNodes.push([]);
    }

    for (let i = 0; i < length; i++) {
      nextNodes[i] = Object.assign({}, currentNodes[i]);
    }
    // start of matrix logic
    for (let i = 0; i < length; i++) {
      // Check the alive nodes/cells
      if (currentNodes[i].isLiving) {
        // set check
        let check = 0;
        // check corner edge cases
        if (i === 0) {
          if (currentNodes[i + 1].isLiving) {
            check++;
          }
          if (currentNodes[i + 20].isLiving) {
            check++;
          }
          if (currentNodes[i + 21].isLiving) {
            check++;
          }
        }
        // top edge case
        if (i >= 1 && i <= 18) {
          if (currentNodes[i - 1].isLiving) {
            check++;
          }
          if (currentNodes[i + 1].isLiving) {
            check++;
          }
          if (currentNodes[i + 19].isLiving) {
            check++;
          }
          if (currentNodes[i + 20].isLiving) {
            check++;
          }
          if (currentNodes[i + 21].isLiving) {
            check++;
          }
        }
        // left edge case
        if (LEFT.includes(i)) {
          if (currentNodes[i - 20 ].isLiving) {
            check++;
          }
          if (currentNodes[i - 19].isLiving) {
            check++;
          }
          if (currentNodes[i + 1].isLiving) {
            check++;
            console.log(check);
          }
          if (currentNodes[i + 20].isLiving) {
            check++;
            console.log(check);
          }
          if (currentNodes[i + 21].isLiving) {
            check++;
            console.log(check);
          }
        }
        // TODO
        // right edge case
        // bottom edge case
        // add other numbers case

        // edge case
        if (i === 380) {
          if (currentNodes[i + 1].isLiving) {
            check++;
          }
          if (currentNodes[i - 20].isLiving) {
            check++;
          }
          if (currentNodes[i - 21].isLiving) {
            check++;
          }
        }
        // edge case
        if (i === 399) {
          if (currentNodes[i - 1].isLiving) {
            check++;
          }
          if (currentNodes[i - 20].isLiving) {
            check++;
          }
          if (currentNodes[i - 21].isLiving) {
            check++;
          }
        }
        if (check === 2 || check === 3) {
          console.log("Alive")
        } else {
          nextNodes[i].isLiving = false;
          console.log("Dead")
        }
      } // end Living node check
      // {} uncomment and start
    } // end massive for loop

    console.log("nextNodes", nextNodes);
  };

  // Todo
  handlePauseGame = () => {};

  // generationCounter method is set within handleStartGame
  handleResetGame = () => {
    this.setState({
      currentNodes: this.state.currentNodes.map(cell =>
        cell.isLiving ? !cell.isLiving : cell
      ),
      isClickable: true,
      isPlaying: false,
      generation: 0
    });
    clearInterval(this.generationCounter);
  };

  render() {
    console.log(this.state);
    return (
      <>
        <GenerationText>
          <span role="img" aria-label="spiral">
            🌀
          </span>{" "}
          Generation: {this.state.generation}
        </GenerationText>
        <CellGrid>
          {this.state.currentNodes.map((cell, index) => (
            <Cell
              key={index}
              id={cell.id}
              isLiving={cell.isLiving}
              toggleCellLife={this.toggleCellLife}
              viewportWidth={this.state.viewportWidth}
            />
          ))}
        </CellGrid>
        <ControlButton onClick={this.handleStartGame}>
          <span role="img" aria-label="play">
            ▶️
          </span>{" "}
          Play
        </ControlButton>
        <ControlButton onClick={this.handlePauseGame}>
          <span role="img" aria-label="pause">
            ⏸
          </span>{" "}
          Pause
        </ControlButton>
        <ControlButton onClick={this.handleResetGame}>
          <span role="img" aria-label="reset">
            🔄
          </span>{" "}
          Reset
        </ControlButton>
        <ControlSelect
          value={this.state.preset}
          onChange={this.handleChange}
          name="preset"
        >
          <option value="none">🎛 Preset: None</option>
          <option value="glider">🎛 Preset: Glider</option>
          <option value="random">🎛 Preset: Random</option>
          <option value="blinker">🎛 Preset: Blinker</option>
        </ControlSelect>
      </>
    );
  }
}
Canvas.defaultProps = {
  viewportWidth: "600"
};

export default Canvas;
