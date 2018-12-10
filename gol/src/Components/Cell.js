import React, {Component} from 'react';
import '../App.css';

class Cell extends Component {
    render() { 
        return ( 
            <div onClick = {() => this.props.clickCell(this.props.place)} className = {this.props.liveCell ? 'cell-alive' : 'cell-dead' }>
            
            </div>
         );
    }
}
 
export default Cell;