import React, {Component} from 'react';
import './index.css';
import Cell from './Cell';
import CellConfigs from './CellConfigs';

class Grid extends Component {
	render() {
		var rowsArr = [];

		var cellClass = "";
		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let cellId = i + "_" + j;
        console.log("cellId: ", cellId)
        cellClass = this.props.gridFull[i][j] ? "box on" : "box off";
        console.log("cellClass: ", cellClass)
				rowsArr.push(
					<Cell
						cellClass={cellClass}
						key={cellId}
						cellId={cellId}
						row={i}
						col={j}
            selectCell={this.props.selectCell}
					/>
				);
			}
		}
    console.log('CellCongigs', CellConfigs)
		return (
			<div className="grid">
				{rowsArr}
			</div>
    );
  }

}

export default Grid;