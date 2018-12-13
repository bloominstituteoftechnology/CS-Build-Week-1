import React, { Component } from 'react'
import Modal from '../modal/Modal';

import { 
  Controls,
  Button,
  OptionsSection,
  PresetSection,
  RangeSlider,
  GenerationSection
} from './ControlSectionStyles';


class ControlSection extends Component {
  state = {
    isModalOpen: true
  }

  handleModal = () => {
    this.setState(prevState => {
      return {isModalOpen: !prevState.isModalOpen}
    });
  }
  
  render() {
    return (
      <Controls>

        <section>
          <Button onClick={this.props.canClick? this.props.startGame: null}>Start</Button>
          <Button onClick={this.props.canClick? this.props.stepGeneration: null}>Step</Button>
          <Button onClick={this.props.endGame}>Stop</Button>
          <Button onClick={this.props.canClick? this.props.clearCells: null}>Clear Grid</Button>
          <Button onClick={this.handleModal}>Rules</Button>
        </section>

        <OptionsSection>
          <PresetSection>
            <label htmlFor="gridPresets">Choose a preset:</label>
            <select onChange={this.props.canClick? this.props.selectGridPreset: null} id="gridPresets">
              <option defaultSelected value="">-- Select --</option>
              <option value="Glider">Glider</option>
              <option value="Acorn">Acorn</option>
              <option value="Blinkers">Blinkers</option>
              <option value="Random">Random</option>
            </select>
          </PresetSection>

          <RangeSlider className="range-slider">
            <label htmlFor="gridSizeSlider">Choose a grid size:</label>
            <input 
              className="range-slider__range"
              id="gridSizeSlider"
              name="gridSizeValue"
              type="range"
              value={this.props.gridSizeValue}
              onChange={this.props.canClick? this.props.handleGridSizeChange : null}
              min="16"
              max="35"
            />
            <span className="range-slider__value">{this.props.gridSizeValue}</span>
          </RangeSlider>
        </OptionsSection>

        <GenerationSection>
          <h2>Generation: {this.props.generation}</h2>
        </GenerationSection>

        {this.state.isModalOpen ? (
          <Modal 
            handleModal={this.handleModal}
            isModalOpen={this.state.isModalOpen}
          />
        ) : null}
      </Controls>
    )
  }
}

export default ControlSection;
