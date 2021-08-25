import React, { Component } from "react";
import { RowFlexWrap, Button } from "../../GlobalStyles";
import { RadioBox } from "./ControlSectionStyles";

import Spacer from "../Spacer";

class ControlSection extends Component {
  state = {
    selectedPreset: "None",
    selectedRange: "16", // 16 20 24 28 32 36
  };

  setSelectedPreset = (e) => {
    this.setState({ selectedPreset: e.target.value });
    this.props.selectGridPreset(e);
  };

  setSelectedRange = (e) => {
    this.setState({ selectedRange: e.target.value });
    this.props.handleGridSizeChange(e);
  };

  render() {
    return (
      <section aria-labelledby="grid-controls-heading">
        <h2 id="grid-controls-heading" className="visually-hidden">
          controls section
        </h2>
        <RowFlexWrap gap="3px">
          <Button onClick={this.props.canClick ? this.props.startGame : null}>
            Start
          </Button>
          <Button
            onClick={this.props.canClick ? this.props.stepGeneration : null}
          >
            Step
          </Button>
          <Button onClick={this.props.endGame}>Stop</Button>
          <Button onClick={this.props.canClick ? this.props.clearCells : null}>
            Clear Grid
          </Button>
        </RowFlexWrap>
        <Spacer axis="vertical" size="30" />
        <RowFlexWrap gap="30px" main="space-evenly">
          <fieldset>
            <legend>presets</legend>
            <RowFlexWrap gap="3px">
              <RadioBox>
                <label
                  htmlFor="none"
                  className={`${
                    this.state.selectedPreset === "None" ? "selected" : null
                  }`}
                >
                  None
                </label>
                <input
                  type="radio"
                  id="none"
                  name="preset"
                  value="None"
                  onClick={(e) => this.setSelectedPreset(e)}
                  checked
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="random"
                  className={`${
                    this.state.selectedPreset === "Random" ? "selected" : null
                  }`}
                >
                  Random
                </label>
                <input
                  type="radio"
                  id="random"
                  name="preset"
                  value="Random"
                  onClick={(e) => this.setSelectedPreset(e)}
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="glider"
                  className={`${
                    this.state.selectedPreset === "Glider" ? "selected" : null
                  }`}
                >
                  Glider
                </label>
                <input
                  type="radio"
                  id="glider"
                  name="preset"
                  value="Glider"
                  onClick={(e) => this.setSelectedPreset(e)}
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="acorn"
                  className={`${
                    this.state.selectedPreset === "Acorn" ? "selected" : null
                  }`}
                >
                  Acorn
                </label>
                <input
                  type="radio"
                  id="acorn"
                  name="preset"
                  value="Acorn"
                  onClick={(e) => this.setSelectedPreset(e)}
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="blinkers"
                  className={`${
                    this.state.selectedPreset === "Blinkers" ? "selected" : null
                  }`}
                >
                  Blinkers
                </label>
                <input
                  type="radio"
                  id="blinkers"
                  name="preset"
                  value="Blinkers"
                  onClick={(e) => this.setSelectedPreset(e)}
                />
              </RadioBox>
            </RowFlexWrap>
          </fieldset>

          <fieldset>
            <legend>grid size</legend>
            <RowFlexWrap gap="3px">
              <RadioBox>
                <label
                  htmlFor="16"
                  className={`${
                    this.state.selectedRange === "16" ? "selected" : null
                  }`}
                >
                  16
                </label>
                <input
                  type="radio"
                  id="16"
                  name="size"
                  value="16"
                  onClick={(e) => this.setSelectedRange(e)}
                  checked
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="20"
                  className={`${
                    this.state.selectedRange === "20" ? "selected" : null
                  }`}
                >
                  20
                </label>
                <input
                  type="radio"
                  id="20"
                  name="size"
                  value="20"
                  onClick={(e) => this.setSelectedRange(e)}
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="24"
                  className={`${
                    this.state.selectedRange === "24" ? "selected" : null
                  }`}
                >
                  24
                </label>
                <input
                  type="radio"
                  id="24"
                  name="size"
                  value="24"
                  onClick={(e) => this.setSelectedRange(e)}
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="28"
                  className={`${
                    this.state.selectedRange === "28" ? "selected" : null
                  }`}
                >
                  28
                </label>
                <input
                  type="radio"
                  id="28"
                  name="size"
                  value="28"
                  onClick={(e) => this.setSelectedRange(e)}
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="32"
                  className={`${
                    this.state.selectedRange === "32" ? "selected" : null
                  }`}
                >
                  32
                </label>
                <input
                  type="radio"
                  id="32"
                  name="size"
                  value="32"
                  onClick={(e) => this.setSelectedRange(e)}
                />
              </RadioBox>
              <RadioBox>
                <label
                  htmlFor="36"
                  className={`${
                    this.state.selectedRange === "36" ? "selected" : null
                  }`}
                >
                  36
                </label>
                <input
                  type="radio"
                  id="36"
                  name="size"
                  value="36"
                  onClick={(e) => this.setSelectedRange(e)}
                />
              </RadioBox>
            </RowFlexWrap>
          </fieldset>
        </RowFlexWrap>
      </section>
    );
  }
}

export default ControlSection;
