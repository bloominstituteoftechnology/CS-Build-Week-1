import React from 'react';
import {Button} from 'reactstrap';

const Footer = (props) => {
    return (
        <div className = 'container'>
            <div className='Buttons'>
                <Button color = 'success' className='submit' onClick={props.play}>Play</Button>
                <Button color = 'primary' className='submit' onClick={props.stop}>Stop</Button>
                <Button color = 'danger' className='submit' onClick={props.reset}>Reset</Button>
                <Button color = 'secondary' className='submit' onClick={props.random}>Random</Button>
            </div>
        </div>
    )
}
 
export default Footer;