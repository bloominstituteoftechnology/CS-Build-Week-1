import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

const operations = [
  [0,1],
  [0,-1],
  [1,-1],
  [-1,1],
  [1,1],
  [-1,-1],
  [1,0],
  [-1,0]
];

const numRows = 50;
const numCols = 50;

 

 
const App = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const makeEmptyGrid = ()=>{
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const [running, setRunning] = useState(false);

 
  const runningRef = useRef(running);
  runningRef.current = running
  
  const speeds = {med:100,fast:10 ,slow:1000}

  const [speed ,setSpeed] = useState(100)
 

  const speedRef = useRef(speed)
  speedRef.current = speed


  console.log('SPEED', speed )


  const runSimulation = useCallback(()=> {
    if(!runningRef.current){
      return;
    }

    setGrid((g)=> {
      return produce(g, gridCopy => {
        for(let i =0; i<numRows;i++){
          for (let k=0; k<numCols; k++){
            let neighbors = 0;
            operations.forEach(([x,y])=> {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI <numRows && newK >= 0 && newK < numCols){
                  neighbors += g[newI][newK]



              }

            });


            if (neighbors< 2 || neighbors >3){
               gridCopy[i][k]=0;

            } else if (g[i][k] ===0 && neighbors ===3)
              gridCopy[i][k] = 1;
          }
        }
      });
    });

    // const newGrid = produce()
    // for(let i =0; i<numRows;i++){
    //   for (let k=0; k<numCols; k++){

    //   }
    // }
    setTimeout(runSimulation,speeds[speedRef.current]);
  },[])

  const [color, setColor]= useState( 'dodgerblue')
   


  // const changeSpeed =(e)=> {
  //   e.preventDefault()
  //   setSpeed({time:1000})
  //   console.log('NEWSPEED', speed)
  // }

  const colors = ['red', 'orange', 'yellow', 'yellowgreen', 'dodgerblue', 'white', 'magenta','cyan', 'chartreuse','#39FF14']
   return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if(!running){
          runningRef.current = true;
          runSimulation()}
        }}
      >
        {running ? "stop" : "start"}
      </button>

       <button 
       onClick = {()=>  {
         setGrid(makeEmptyGrid)
       }}>
      

         CLEAR GRID
       </button>



       <button
       onClick = {()=> {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
          rows.push(Array.from(Array(numCols), () => Math.random() >0.5? 1:0));
        }
        setGrid(rows);
       }}>
          Random
       </button>

       {/* Change Color */}


       

      <form type = "submit"
       className = 'colors'
       >
         <label htmlFor ="color"> 
         <h4 style = {{color: `${color}`}}
         >Color</h4>
      <select
        id = 'type' 
        value = {color}
        onChange = {e => setColor(e.target.value)}
        // onBlur ={submitSearch}
        >
      <option style = {{color: `${color}`}}> {color.color}</option>
       {colors.map (color => (
        <option  style = {{backgroundColor:`${color}` }}key ={color} value = {color}>
          {color}
        </option>
       ))}



        </select>
        </label>

 



       </form>
        
       <form type = "submit"
       className = 'speedForm'
       >
         <label htmlFor ="speed"> 
         <h3 >Speed</h3> 
      <select
        id = 'type' 
        value = {speed}
        onChange = {e => setSpeed(e.target.value)}
         >
           <option value = {speed.med}> 
          
          med
       </option>
      <option value = {speed.fast}> fast</option>
         
        <option value = {speed.slow}>slow</option>
       


        </select>
        </label>

 



       </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols},20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}- ${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ?  `${color}` : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
