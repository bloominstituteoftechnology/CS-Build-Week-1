import React from 'react';

const Footer = (props) => {
    return (
        <div className = 'container'>
            <div className='buttons'>
                <button className='submit' onClick={props.play}>Play</button>
                <button className='submit' onClick={props.stop}>Stop</button>
                <button className='submit' onClick={props.reset}>Reset</button>
                <button className='submit' onClick={props.random}>Random</button>
            </div>
        </div>
    )
}
 
export default Footer;