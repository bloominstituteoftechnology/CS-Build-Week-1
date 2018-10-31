import React from 'react';
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';
import stop from '../assets/stop.svg';
import {ControlsWrapper} from '../theme/css';

const Controls = props => {
    return(
    <ControlsWrapper>
    <img src={pause} alt="pause button"></img>
    <img src={play} alt="play button"></img>
    <img src={stop} alt="stop button"></img>
    </ControlsWrapper>)
}

export default Controls;