import React, {Component} from 'react';
import './Buttons.css';

class Buttons extends Component {
    constructor() {
        super();
        this.state={}
    }

    render() {
        return (
            <div className="buttons">
                <button> Start</button>
                <button> Pause</button>
                <button> Clear</button>
                <span>Generations: {this.state.generation}</span>
            </div>
        )
    }
}

export default Buttons;