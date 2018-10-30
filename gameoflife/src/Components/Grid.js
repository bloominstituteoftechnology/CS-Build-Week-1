import React, {Component} from 'react';
import './Grid.css';
import Pixel from './Pixel';

class Grid extends Component {
    constructor() {
        super();
        this.state={}
    }

    render(){
        return (
            <div className='Grid'>
                <Pixel />
            </div>
        )
    }
}




export default Grid; 