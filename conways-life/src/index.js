import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap'

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr))
}

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
                        key={boxId}
                        boxId={boxId}
                        row={rowIndex}
                        col={colIndex}
                        selectBox={props.selectBox}
                    />
                )
            })
        )


        return (
            <div className="grid" style={{width}}>
                {rowsArr}
            </div>
        )
}

class Buttons extends React.Component { // Should this be a stateless functional component?
    handleSelect = evt => {
        this.props.gridSize(evt)
    }

    render() {
        return (
            <div className="center">
                <ButtonToolbar>
                    <button className="btn btn-default" onClick={this.props.playButton}>
                        Play
                    </button>
                    <button className="btn btn-default" onClick={this.props.pauseButton}>
                        Pause
                    </button>
                    <button className="btn btn-default" onClick={this.props.clear}>
                        Clear
                    </button>
                    <button className="btn btn-default" onClick={this.props.slow}>
                        Slow
                    </button>
                    <button className="btn btn-default" onClick={this.props.fast}>
                        Fast
                    </button>
                    <button className="btn btn-default" onClick={this.props.seed}>
                        Seed
                    </button>
                    <DropdownButton
                    title="Grid Size"
                    id="size-menu"
                    onSelect={this.handleSelect}
                    >
                    <MenuItem eventKey="1">20x10</MenuItem>
                    <MenuItem eventKey="2">50x30</MenuItem>
                    <MenuItem eventKey="3">70x50</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
        )
    }
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
            //gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }


    selectBox = (row, col) => {
        const gridFull = this.state.gridFull.map((rowArr, rowIndex) => 
            rowArr.map(
                (item, colIndex) => (rowIndex === row && colIndex === col ? !item : item)
            )
        )

        this.setState(() => ({gridFull}));
        // let gridCopy = arrayClone(this.state.gridFull)
        // gridCopy[row][col] = !gridCopy[row][col]

        // this.setState({gridFull: gridCopy})
    }

    seed = () => {
        const gridFull = this.state.gridFull.map(rowArr =>
            rowArr.map(() => Math.floor(Math.random() * 4) === 1)
          );

        this.setState(() => ({ gridFull }));
        // let gridCopy = arrayClone(this.state.gridFull)
        // for (let i=0; i<this.rows; i++)
        // {
        //     for (let j = 0; j <this.cols; j++)
        //     {
        //         if (Math.floor(Math.random() * 4) === 1)
        //         {
        //             gridCopy[i][j] = true
        //         }
        //     }
        // }
        // this.setState({gridFull: gridCopy})
    }

    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.play, this.speed)
    }

    pauseButton = () => {
        clearInterval(this.intervalId)
    }

    play = () => {
        let g = this.state.gridFull // here g is a copy of the grid
        let g2 = arrayClone(this.state.gridFull) // a second copy of the grid

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                // Could also do this with switch statements I think, just don't add any breaks until the end
                let neighbors = 0
                if (i > 0) if (g[i - 1][j]) neighbors++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) neighbors++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) neighbors++;
                if (j < this.cols - 1) if (g[i][j + 1]) neighbors++;
                if (j > 0) if (g[i][j - 1]) neighbors++;
                if (i < this.rows - 1) if (g[i + 1][j]) neighbors++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) neighbors++;
                if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) neighbors++;
                if (g[i][j] && (neighbors < 2 || neighbors > 3)) g2[i][j] = false;
                if (!g[i][j] && neighbors === 3) g2[i][j] = true;
            }
        }
        this.setState(prevState => ({
                gridFull: g2,
                generations: prevState.generations + 1
            }))
    }

    componentDidMount() {
        this.seed()
        this.playButton()
    }

    slow = () => {
        this.speed = 1000
        this.playButton()
    }

    fast = () => {
        this.speed = 100
        this.playButton()
    }

    clear = () => {
        const grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false))

        this.setState(() => ({
            gridFull: grid,
            generations: 0
        }))
    }

    gridSize = size => {
        switch(size) {
            case "1":
                this.cols = 20
                this.rows = 10
                break
            case "2":
                this.cols = 50
                this.rows = 30
                break
            default:
                this.cols = 70
                this.rows = 50
        }
        this.clear()
    }

    render() {
        return(
            <div>
                <h1>The Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generations: {this.state.generations}</h2>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
