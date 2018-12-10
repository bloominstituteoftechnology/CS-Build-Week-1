import React from 'react';

const Footer = (props) => {
    return (
        <div className = 'container'>
            <div className='buttons'>
                <button className='submit' onClick={props.start}>Start</button>
                <button className='submit' onClick={props.pause}>Pause</button>
                <button className='submit' onClick={props.stop}>Stop</button>
            </div>
        </div>
    )
}
 
export default Footer;