import React from 'react';
import Question_Mark from '../utils/question_mark.png'
import "../scss/Presets.scss";

const Presets = props => {
    return (
        <div className="presets">
            <div className="preset one"
                 onClick={props.randomSeed}
            >
                <img src={Question_Mark} alt="?" />
                Random
            </div>
            <div className="preset two"
                //  onClick={}
            >
                <img src="#" alt=""/>
                Preset 2
            </div>
            <div className="preset three"
                //  onClick={}
            >
                <img src="#" alt="" />
                Preset 3
            </div>
            <div className="preset four"
                //  onClick={}
            >
                <img src="#" alt="" />
                Preset 4
            </div>
        </div>
    )
}

export default Presets;