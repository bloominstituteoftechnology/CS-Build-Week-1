import React from 'react';
import './canvas.css';
import AutosizeInput from 'react-input-autosize';

class LifeCanvasOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.validity.valid ? Number(event.target.value) : this.props.generation });
    }

    calculate = () => {
        this.props.calculate(this.state.input);
        this.setState({ input: '' });
    }

    setSpeed = event => {
        this.props.setSpeed(Number(event.target.value));
    }

    render() {
        return (
            <div className='canvas-options' onSubmit={event => event.preventDefault()} >
                <button onClick={this.props.clear}>Clear</button>
                <button onClick={this.props.randomize}>Randomize</button>
                <button onClick={this.props.start}>{this.props.continue ? 'Stop' : 'Start'}</button>
                <button onClick={this.props.next}>Next</button>

                <form className='canvas-options-form'>
                    <AutosizeInput className='canvas-options-input'
                        type='text'
                        pattern="[0-9]*"
                        name='input'
                        onChange={this.handleInput}
                        value={this.state.input}
                        placeholder={String(this.props.generation)} />
                    <input
                        className='canvas-options-input-range'
                        type='range'
                        min="10"
                        max="1000"
                        step="10"
                        defaultValue="10"
                        name='speed'
                        onChange={this.setSpeed} />
                    <input
                        type='submit'
                        onClick={this.calculate}
                        style={{ width: "0px", height: "0px", opacity: "0" }} />
                </form>

            </div>
        );
    }
}

export default LifeCanvasOptions;