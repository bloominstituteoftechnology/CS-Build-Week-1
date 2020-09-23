import Cells from './Cells'

const Cell = (Cells) =>{
    return(
        <div>
    {cells.map(cell =>(
        
        <Cell id='Cell' className='Cell-light' x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`}/>
    ))}
    </div>
    )
}

export default Cell;