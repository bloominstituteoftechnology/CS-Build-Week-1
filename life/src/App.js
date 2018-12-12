import React, { Component } from 'react';
import styled from 'styled-components';
// import Grid from './components/grid';
import GridObject from './components/gridObject';
// import Canvas from './components/canvas';
import { SketchPicker } from 'react-color';

class App extends Component {
  constructor(){
    super();
    this.state = {
      color: "#DE4C26",
      preset: null,
      presets: [{0: true,
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
        22: false,
        23: false,
        24: false,
        25: false,
        26: false,
        27: false,
        28: false,
        29: false,
        30: false,
        31: false,
        32: false,
        33: false,
        34: false,
        35: false,
        36: false,
        37: false,
        38: false,
        39: false,
        40: false,
        41: false,
        42: false,
        43: false,
        44: false,
        45: false,
        46: false,
        47: false,
        48: false,
        49: false,
        50: false,
        51: false,
        52: false,
        53: false,
        54: false,
        55: false,
        56: false,
        57: false,
        58: false,
        59: false,
        60: false,
        61: false,
        62: false,
        63: false,
        64: false,
        65: false,
        66: false,
        67: false,
        68: false,
        69: false,
        70: false,
        71: false,
        72: false,
        73: false,
        74: false,
        75: false,
        76: false,
        77: false,
        78: false,
        79: false,
        80: false,
        81: false,
        82: false,
        83: false,
        84: false,
        85: false,
        86: false,
        87: false,
        88: false,
        89: false,
        90: false,
        91: false,
        92: false,
        93: false,
        94: false,
        95: false,
        96: false,
        97: false,
        98: false,
        99: false,
        100: false,
        101: false,
        102: false,
        103: false,
        104: false,
        105: false,
        106: false,
        107: false,
        108: false,
        109: false,
        110: false,
        111: false,
        112: false,
        113: false,
        114: false,
        115: false,
        116: false,
        117: false,
        118: false,
        119: false,
        120: false,
        121: false,
        122: false,
        123: false,
        124: false,
        125: false,
        126: false,
        127: false,
        128: false,
        129: false,
        130: false,
        131: false,
        132: false,
        133: false,
        134: false,
        135: false,
        136: false,
        137: false,
        138: false,
        139: false,
        140: false,
        141: false,
        142: false,
        143: false,
        144: false,
        145: false,
        146: false,
        147: false,
        148: false,
        149: false,
        150: false,
        151: false,
        152: false,
        153: false,
        154: false,
        155: false,
        156: false,
        157: false,
        158: false,
        159: false,
        160: false,
        161: false,
        162: false,
        163: false,
        164: false,
        165: false,
        166: false,
        167: false,
        168: false,
        169: false,
        170: false,
        171: false,
        172: false,
        173: false,
        174: false,
        175: false,
        176: false,
        177: false,
        178: false,
        179: false,
        180: false,
        181: false,
        182: false,
        183: false,
        184: false,
        185: false,
        186: false,
        187: false,
        188: false,
        189: false,
        190: false,
        191: false,
        192: false,
        193: false,
        194: false,
        195: false,
        196: false,
        197: false,
        198: false,
        199: false,
        200: false,
        201: false,
        202: false,
        203: false,
        204: false,
        205: false,
        206: false,
        207: false,
        208: false,
        209: false,
        210: false,
        211: false,
        212: false,
        213: false,
        214: false,
        215: false,
        216: false,
        217: false,
        218: false,
        219: false,
        220: false,
        221: false,
        222: false,
        223: false,
        224: false,}, {}, {}, {}],
    }
  }

  selectColor = (color) => {
    console.log("select color")
    this.setState({
      color: color.hex
    })
  }

  selectPreset = (e) => {
    console.log("select preset", e.target.name-1)
    this.setState({
      preset: this.state.presets[e.target.name-1]
    })
  }


  render() {
    console.log(this.state.preset)
    return (
      <AppDiv>
        Conways "Game of Life"
        {/* <Canvas /> */}
        {/* <Grid /> */}
        <div>
          <GridObject preset={this.state.preset} color={this.state.color} />
          <div className="preset">
            <button onClick={this.selectPreset} name="1">Preset 1</button>
            <button onClick={this.selectPreset} name="2">Preset 2</button>
            <button onClick={this.selectPreset} name="3">Preset 3</button>
            <button onClick={this.selectPreset} name="4">Preset 4</button>
            <SketchPicker 
              color={this.state.color}
              onChangeComplete={ this.selectColor}
            />
            {/* <input type="color" name="favcolor" value="#ff0000"></input>
              <input onChange={this.selectColor} type="color" name="favcolor" value="#000000" /> */}
            {/* <form onSubmit={this.selectColor}>
              <input type="submit" />
            </form> */}
          </div>
        </div>
        <p>Click to toggle squares. Press 'next' to advance one frame at at time or hit start to progress automatically</p>
        <p>If the cell is alive **and** has 2 or 3 neighbors, then it remains
  alive. Else it dies.</p>
        <p>If the cell is dead **and** has exactly 3 neighbors, then it comes to
  life. Else if remains dead.</p>

      </AppDiv>
    );
  }
}

export default App;

const AppDiv = styled.div`
  border: 1px solid red;
  height: 100vh;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;