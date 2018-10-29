import React from 'react';

class Panel extends React.Component {
  render() { 
    return (
      <div className='Panel'>
        <span>0 Generation</span>
        <button>Start/Stop</button>
        <button>Clear</button>
      </div>
    )
  }
}
 
export default Panel;