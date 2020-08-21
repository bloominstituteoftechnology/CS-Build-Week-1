import React, {useState} from 'react';
import produce from 'immer'

const Rows = 25;
const Col = 25;

function App() {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        
        for (let i = 0; i < Rows; i++) {
            rows.push(Array.from(Array(Col), () => 0));
        };

        return rows;
    });

    const [start, setStart] = useState(false);

    return (
        <>
            <button 
                onClick={() => {
                    setStart(!start);
            }}>
                {start ? 'pause' : 'start'}
            </button>

            {/* Possible component */}
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