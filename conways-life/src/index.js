import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col)
    }

    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}

            />
        )
    }    
}

const Grid = props => {
        const width = props.cols * 14
        let boxClass = ""

        const rowsArr = props.gridFull.map((rowsArr, rowIndex) => 
            rowsArr.map((item, colIndex) => {
                const boxId = `${rowIndex}_${colIndex}`

                boxClass = props.gridFull[rowIndex][colIndex] ? "box on": "box off"

                return (
                    <Box
                        boxClass={boxClass}
                        key={boxId} boxId={boxId}
                        row={rowIndex}
                        col={colIndex}
                        selectBox={props.selectBox}
                    />
                )
            })
        )


        return (
            <div className="grid" style={{width: width}}>
                {rowsArr}
            </div>
        )
}

class Main extends React.Component {
    constructor() {
        super()
        this.speed = 100
        this.rows = 30
        this.cols = 50

        this.state = {
            generations: 0,
            gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
        }
    }

    render() {
        console.log(this.state.gridFull)
        return(
            <div>
                <h1>The Game of Life</h1>
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.state.rows}
                    cols={this.state.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generations: {this.state.generations}</h2>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
