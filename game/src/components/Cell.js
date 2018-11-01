import React, { Component } from 'react';
import {Cells, CellAlive, CellDead} from '../theme/css';

class Cell extends Component {
    render() {
        return(
        <Cells onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? <CellAlive/> : <CellDead/>} />
        )
    }
}

export default Cell;