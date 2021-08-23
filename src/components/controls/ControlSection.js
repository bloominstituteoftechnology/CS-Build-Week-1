import React, { Component } from "react";

import {
  Button,
  OptionsContainer,
  PresetContainer,
  RangeSlider,
} from "./ControlSectionStyles";

class ControlSection extends Component {
  render() {
    return (
      <section aria-labelledby="grid-controls-heading">
        <h2 id="grid-controls-heading" className="visually-hidden">
          controls section
        </h2>

        <div>
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
        </div>

        <OptionsContainer>
          <PresetContainer>
            <label htmlFor="gridPresets">Choose a preset:</label>
            <select
              onChange={
                this.props.canClick ? this.props.selectGridPreset : null
              }
              id="gridPresets"
            >
              <option defaultSelected value="">
                -- Select --
              </option>
              <option value="Glider">Glider</option>
              <option value="Acorn">Acorn</option>
              <option value="Blinkers">Blinkers</option>
              <option value="Random">Random</option>
            </select>
          </PresetContainer>

          <RangeSlider className="range-slider">
            <label htmlFor="gridSizeSlider">Choose a grid size:</label>
            <input
              className="range-slider__range"
              id="gridSizeSlider"
              name="gridSizeValue"
              type="range"
              value={this.props.gridSizeValue}
              onChange={
                this.props.canClick ? this.props.handleGridSizeChange : null
              }
              min="16"
              max="35"
            />
            <span className="range-slider__value">
              {this.props.gridSizeValue}
            </span>
          </RangeSlider>
        </OptionsContainer>
      </section>
    );
  }
}

export default ControlSection;
