import React from 'react';
import Styled from 'styled-components';
import Cell from "./Cell";

const GridBox = Styled.div`
    display: flex;
    flex-wrap: wrap;
    border: 2px solid black;
`;

class Grid extends React.Component {
	render() {
		const width = (this.props.cols * 20);
		var rowsArr = [];

		var boxClass = "";
		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let boxId = i + "_" + j;

				boxClass = this.props.gridFull[i][j] ? "alive" : "dead";
				rowsArr.push(
					<Cell
						cellClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}
					/>
				);
			}
		}

		return (
			<GridBox style={{width: width}}>
				{rowsArr}
			</GridBox>
		);
	}
}

export default Grid;