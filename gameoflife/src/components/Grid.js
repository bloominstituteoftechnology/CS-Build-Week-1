import React, {Component} from 'react';
import './index.css';
import Cell from './Cell';

class Grid extends Component {
	render() {
		var rowsArr = [];

		var cellClass = "";
		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let cellId = i + "_" + j;

				cellClass = this.props.gridFull[i][j] ? "box on" : "box off";
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

		return (
			<div className="grid">
				{rowsArr}
			</div>
    );
  }

}

export default Grid;