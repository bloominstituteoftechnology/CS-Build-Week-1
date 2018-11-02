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
                <button onClick={this.props.start}> Start</button>
                <button onClick={this.props.pause}> Pause</button>
                <button onClick={this.props.clear}> Clear</button>
            </div>
        )
    }
}

export default Buttons;