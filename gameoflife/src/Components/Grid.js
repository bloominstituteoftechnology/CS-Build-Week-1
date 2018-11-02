import React, {Component} from 'react';
import './Grid.css';
import Pixel from './Pixel';

class Grid extends Component {
    
    render(){
        let width = this.props.columns=14;
        let rowsArr = [];
        let boxClass = '';
        for (let i =0; i< this.props.rows; i++) {
            for (let j= 0; j<this.props.columns; j++) {
                let boxId = i + '_'+ j;

                boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off';
                rowsArr.push(
                    <Pixel
                        boxClass={boxClass}
                        key={boxId}
                        boxId= {boxId}
                        row={i}
                        columns={j}
                        selectBox={this.props.selectBox}
                    />
                )
            }
        }
        return (
            <div className='Grid' style={{width: width}}>
                {{rowsArr}}
                <Pixel />
            </div>
        )
    }
}




export default Grid; 