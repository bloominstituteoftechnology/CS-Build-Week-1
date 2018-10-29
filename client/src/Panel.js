import React from 'react';

class Panel extends React.Component {
  render() { 
    return (
      <div className='Panel'>
        <span>0 Generation</span>
        <div className='button'>Start/Stop</div>
        <div className='button'>Clear</div>
      </div>
    )
  }
}
 
export default Panel;