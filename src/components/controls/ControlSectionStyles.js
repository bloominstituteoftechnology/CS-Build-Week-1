import styled from "styled-components";

export const Button = styled.button`
  font-family: "Space Mono", monospace;
  font-size: 2.5rem;
  color: rgba(248, 205, 218, 0.8);
  text-shadow: 1px 1px 8px rgba(238, 130, 238, 0.7);
  padding: 10px 20px;
  background-color: rgba(248, 205, 218, 0.1);
  border-radius: 3px;
  border: none;
  border-bottom: 1px solid rgba(238, 130, 238, 0.9);
  border-top: 1px solid rgba(238, 130, 238, 0.9);
  border-left: 1px solid rgba(238, 130, 238, 0.9);
  &:last-child {
    border-right: 1px solid rgba(238, 130, 238, 0.9);
  }
  box-shadow: 0.5px 0.5px 10px 0.5px rgba(238, 130, 238, 0.3);
  &:hover {
    cursor: pointer;
    background: #134e5e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #134e5e,
      #71b280
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #134e5e,
      #71b280
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`;

export const OptionsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  label {
    display: block;
    margin-bottom: 10px;
    font-size: 2.5rem;
    color: rgba(248, 205, 218, 0.8);
    text-shadow: 1px 1px 8px rgba(238, 130, 238, 0.7);
  }
  span {
    font-size: 2rem;
    color: rgba(248, 205, 218, 0.8);
    text-shadow: 1px 1px 8px rgba(238, 130, 238, 0.7);
  }
`;

export const PresetContainer = styled.div`
  width: 50%;
  select {
    font-family: "Space Mono", monospace;
    font-size: 2rem;
    padding: 5px 25px;
    color: rgba(248, 205, 218, 0.8);
    text-shadow: 1px 1px 8px rgba(238, 130, 238, 0.7);
    background-color: rgba(248, 205, 218, 0.1);
    border-radius: 3px;
    option {
      color: #222;
    }
  }
`;

export const RangeSlider = styled.div`
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
    background: rgba(248, 205, 218, 0.8);
    outline: none;
    padding: 0;
    margin: 0;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid rgba(238, 130, 238, 0.9);
      background: #434343;
      cursor: pointer;
      transition: background 0.15s ease-in-out;

      &:hover {
        background: #71b280;
      }
    }
    &:active::-webkit-slider-thumb {
      background: #71b280;
    }
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: 0;
      border-radius: 50%;
      background: #2c3e50;
      cursor: pointer;
      transition: background 0.15s ease-in-out;
      &:hover {
        background: #71b280;
      }
    }
    &:active::-moz-range-thumb {
      background: #71b280;
    }
    &:focus {
      &::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px #fff, 0 0 0 6px #71b280;
      }
    }
  }

  .range-slider__value {
    display: inline-block;
    position: relative;
    width: 60px;
    color: #434343;
    line-height: 20px;
    text-align: center;
    border-radius: 3px;
    background-color: rgba(248, 205, 218, 0.8);
    padding: 5px 10px;
    margin-left: 10px;
    &:after {
      position: absolute;
      top: 8px;
      left: -6.8px;
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-right: 7px solid rgba(248, 205, 218, 0.8);
      border-bottom: 7px solid transparent;
      content: "";
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
