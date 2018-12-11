import React, { Component } from 'react';
import './App.css';
import Grid from './components/GameGrid';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = { curGrid: [],
    x: 15,
    y: 15,
    running:false,
    nextGrid:[],
    afterNextGrid:[],
    intervalID : 0,
    gen:1
    
    };
  }
  newGrid = ()=>{
    let freshGrid = [];
    for (let index = 0; index < (this.state.x*this.state.y) ; index++) {
      freshGrid.push({alive:false, color:'#ffffff',isClickable:true})
    }
    this.setState({
      curGrid:freshGrid,
      nextGrid:freshGrid,
      afterNextGrid:freshGrid,
      gen:1
    })
  }
  determineLife = (cellID,gridArr)=>{
    let holdingArr = [];
    //top right bottom left
    let touchs = [false,false,false,false];
    if(cellID < this.state.x){
      touchs[0] = true;
    }
    if(cellID >= (this.state.curGrid.length -this.state.x)){
      touchs[2] = true;
    }
    if((cellID +1 ) % this.state.y === 0){
      touchs[1] = true;
    }
    if(cellID % this.state.y  ===0){
      touchs[3] = true;
    }
    
    if(!touchs[0] ){
      holdingArr.push(gridArr[cellID -this.state.x].alive)
      if(!touchs[1]){
        holdingArr.push(gridArr[cellID -this.state.x+1 ].alive)
      }
      if(!touchs[3]){
        holdingArr.push(gridArr[cellID -this.state.x -1 ].alive)
      }
    }
    if(!touchs[2]){
      holdingArr.push(gridArr[cellID +this.state.x].alive)
      if(!touchs[1]){
        holdingArr.push(gridArr[cellID +this.state.x +1 ].alive)
      }
      if(!touchs[3]){
        holdingArr.push(gridArr[cellID +this.state.x -1 ].alive)
      }
    }
    if(!touchs[1] ){
      holdingArr.push(gridArr[cellID + 1].alive)
    }
    if(!touchs[3] ){
      holdingArr.push(gridArr[cellID -1].alive)
    }
    const cellcount = holdingArr.filter(i=>i===true).length;
    if(cellcount === 3){
      return true;
    }
    if(cellcount === 2 && gridArr[cellID].alive){
      return true
    }
    return false;
  }
  arrayCalc = (arr)=>{
    return arr.map((e,i,a)=>{
      const isAlive = this.determineLife(i,a);
      const color = isAlive ? "#000000":"#ffffff";
      return {alive:isAlive, color:color,isClickable:e.isClickable}
    })
  }
  toggleClick =()=>{
    this.setState({
      curGrid: this.state.curGrid.map(e=>{
        e.isClickable=!e.isClickable;
        return e;
      })
    })
  }
  gameLoop = ()=>{
    const newArr = this.arrayCalc(this.state.afterNextGrid);
    let plusOne = this.state.gen+1;
      this.setState({
        curGrid: [...this.state.nextGrid],
        nextGrid:[...this.state.afterNextGrid],
        afterNextGrid:newArr,
        gen:plusOne
      })
     
  }
  waitTime = ()=>{
    const interval = setInterval(() => {
      this.gameLoop();
    }, 1000);
    this.setState({
      intervalID: interval,
    });
  }
  stopSim = ()=>{
    clearInterval(this.state.intervalID);
    this.toggleClick();
    this.setState({
      running: false
    })
  }
  reset = ()=>{
    this.newGrid();
  }
  newSim = ()=>{
    this.toggleClick();
    const newArr = this.arrayCalc(this.state.curGrid);
    const lastArr = this.arrayCalc(newArr);
    this.setState({
      running: true,
      nextGrid:newArr,
      afterNextGrid:lastArr
    },()=>{
      this.waitTime();
    })
  }
  setGrid =()=>{
    this.newGrid();
    
  }
  toggleCell =(e)=>{
    let newArr = [...this.state.curGrid];
    newArr[e.target.id].alive = !newArr[e.target.id].alive;
    if(newArr[e.target.id].alive){
      newArr[e.target.id].color = "#000000";
    }
    else{
      newArr[e.target.id].color = "#ffffff";

    }
    this.setState({
      curGrid : newArr
    })
  } 
  componentDidMount(){
    this.newGrid();
  }
  render() {
    return (
      <div className="App">
       <Grid pixels={this.state.curGrid} x={this.state.x} y ={this.state.y} clickHandle={this.toggleCell}/>
       <button onClick={this.newSim}>Start</button>

       <button onClick={this.stopSim}>Stop</button>
       <button onClick={this.reset}>Reset</button>

        <div className="gen">Current Gen is:{this.state.gen}</div>
      </div>
    );
  }
}

export default App;
