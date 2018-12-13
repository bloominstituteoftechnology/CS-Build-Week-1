import React from 'react';
import {Button, Container} from 'reactstrap';
import '../App.css';

const Footer = (props) => {
    return (
        <Container style = {{marginTop: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>
                <Button color = 'success' size = 'sm' className='submit' onClick={props.play}>Play</Button>
                <Button color = 'primary' size = 'sm' className='submit' onClick={props.stop}>Stop</Button>
                <Button color = 'danger' size = 'sm' className='submit' onClick={props.reset}>Reset</Button>
                <Button color = 'secondary' size = 'sm' className='submit' onClick={props.random}>Random</Button>
        </Container>
    )
}
 
export default Footer;