import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer'

const Rows = 25;
const Col = 25;
// Used to find neighbors from a cell
const surround = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1]
]

function App() {
    // State for square toggle
    const [grid, setGrid] = useState(() => {
        const rows = [];    
        for (let i = 0; i < Rows; i++) {
            rows.push(Array.from(Array(Col), () => 0));
        };
        return rows;
    });

    const [start, setStart] = useState(false);

    const runningRef = useRef();
    runningRef.current = start

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        // simulate
        setGrid((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i < Rows; i++) {
                    // checking for neighbors
                    for (let j = 0; j < Col; j++) {
                        let neighbors = 0;
                        surround.forEach(([x, y]) => {
                            const genI = i + x;
                            const genJ = j + y;
                            // making sure we are in the grib and not out of it
                            if (genI >= 0 && genI < Rows && genJ >= 0 && genJ < Col) {
                                 neighbors += g[genI][genJ]
                            }
                        })

                        // determines if a cell dies or is born depending on above condition
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }                        
                          
                    }
                }
            })
        })

        setTimeout(runSimulation, 1000);
    }, []);

    return (
        <>
            {/* Button used to start and pause simulation */}
            <button 
                onClick={() => {
                    setStart(!start);
                    if (!start) {
                        runningRef.current = true;
                        runSimulation();
                    }
            }}>
                {start ? 'pause' : 'start'}
            </button>

            {/* Possible component. Used to generate the grid and toggle squares */}
            <div 
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Col}, 20px)`
                }}
            >
                {grid.map((rows, x) => 
                    rows.map((col, y) => 
                        <div
                            key={`${x}-${y}`}
                            onClick={() => {
                                const newGrid = produce(grid, gridClone => {
                                    gridClone[x][y] = grid[x][y] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                            style={{ 
                                width: 20, 
                                height: 20,
                                backgroundColor: grid[x][y] ? "blue" : undefined,
                                border: 'solid 1px black'
                            }}
                        />
                    )
                )}
            </div>
        </>
    )
};

export default App;