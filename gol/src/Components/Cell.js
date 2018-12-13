import React, {Component} from 'react';
import '../App.css';

class Cell extends Component {
    render() { 
        return ( 
            <div onClick = {() => this.props.toggleCell(this.props.coordinates)}
                className = {this.props.liveCell ? 'cell-live' : 'cell-dead'}>
            </div>
         );
    }
}
 
export default Cell;