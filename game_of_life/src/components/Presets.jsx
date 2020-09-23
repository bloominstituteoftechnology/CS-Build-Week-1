import React from 'react';
import Question_Mark from '../utils/question_mark.png';
import Oscillator from '../utils/preset2.png';
import Glider from '../utils/preset3.png';
import SpaceShip from '../utils/preset4.png';

import "../scss/Presets.scss";

const Presets = props => {
    return (
        <div className="presets">
            <div className="preset one"
                 onClick={props.randomSeed}
            >
                <img src={Question_Mark} alt="?" />
                <p>Random</p>
            </div>
            <div className="preset two"
                //  onClick={}
            >
                <img src={Oscillator} alt=""/>
                Oscillator
            </div>
            <div className="preset three"
                //  onClick={}
            >
                <img src={Glider} alt="" />
                Glider
            </div>
            <div className="preset four"
                //  onClick={}
            >
                <img src={SpaceShip} alt="" />
                SpaceShip
            </div>
        </div>
    )
}

export default Presets;