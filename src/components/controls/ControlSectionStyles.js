import styled from 'styled-components';


export const Controls = styled.main`
  margin-top: 30px;
`;


export const OptionsSection = styled.section`
  display: flex;
  justify-content: space-between;
`;


export const PresetSection = styled.section`
  width: 50%;
`;


export const RangeSlider = styled.section`
  width: 50%;

  &,
  &:before,
  &:after {
    box-sizing: border-box;
  }

  .range-slider__range {
  -webkit-appearance: none;
  width: 50%;
  height: 10px;
  border-radius: 5px;
  background: #d7dcdf;
  outline: none;
  padding: 0;
  margin: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2c3e50;
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: #1abc9c;
    }
  }

  &:active::-webkit-slider-thumb {
    background: #1abc9c;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 50%;
    background: #2c3e50;
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: #1abc9c;
    }
  }

  &:active::-moz-range-thumb {
    background: #1abc9c;
  }
  
  // Focus state
  &:focus {
    
    &::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px #fff,
                  0 0 0 6px #1abc9c;
    }
  }
}

.range-slider__value {
  display: inline-block;
  position: relative;
  width: 60px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: #2c3e50;
  padding: 5px 10px;
  margin-left: 8px;

  &:after {
    position: absolute;
    top: 8px;
    left: -7px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid #2c3e50;
    border-bottom: 7px solid transparent;
    content: '';
  }
}

/*modzilla overrides*/
::-moz-range-track {
    background: #d7dcdf;
    border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer { 
  border: 0; 
}
`;


export const GenerationSection = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
