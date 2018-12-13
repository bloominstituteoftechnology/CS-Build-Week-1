import React, { Component } from 'react'
import { Controls, OptionsSection, PresetSection, RangeSlider, GenerationSection } from './ControlSectionStyles';
import Modal from '../modal/Modal';


class ControlSection extends Component {
  state = {
    isModalOpen: false
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
          <button onClick={this.props.canClick? this.props.startGame: null}>Start</button>
          <button onClick={this.props.canClick? this.props.stepGeneration: null}>Step</button>
          <button onClick={this.props.endGame}>Stop</button>
          <button onClick={this.props.canClick? this.props.clearCells: null}>Clear Grid</button>
          <button onClick={this.handleModal}>Rules</button>
        </section>

        <OptionsSection>
          <PresetSection>
            <label htmlFor="gridPresets">Choose a preset:</label>
            <select onChange={this.props.canClick? this.props.selectGridPreset: null} id="gridPresets">
              <option value="">-- Select --</option>
              <option value="clearPresets">Clear Grid</option>
              <option value="Glider">Glider</option>
              <option value="Acorn">Acorn</option>
              <option value="gridPresetThree">Preset 3</option>
              <option value="gridPresetFour">Preset 4</option>
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
          <p><strong>Generation: {this.props.generation}</strong></p>
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
