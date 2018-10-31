import React from 'react';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    }
  }

  render() {
    return (
      <div className='button-container'>
        <button className='button'><span>Start</span></button>
        <button className='button'><span>Stop</span></button>
        <button className='button'><span>Reset</span></button>
      </div>
    )
  }

}

export default Buttons;