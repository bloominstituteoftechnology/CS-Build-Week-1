import React, { Component } from 'react';
import './App.css';
import Grid from './components/GameGrid';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = { curGrid: [],
    x: 5,
    y: 5,
    running:false,
    nextGrid:[],
    afterNextGrid:[],
    intervalID : 0
    
    };
  }
  newGrid = ()=>{
    let freshGrid = [];
    for (let index = 0; index < (this.state.x*this.state.y) ; index++) {
      freshGrid.push({alive:false, color:'#fffff',isClickable:true})
    }
    this.setState({
      curGrid:freshGrid
    })
  }
  determineLife = (cellID,gridArr)=>{
    let holdingArr = [];
    //top right bottom left
    let touchs = [false,false,false,false];
    if(!cellID < this.state.x){
      touchs[0] = true;
    }
    if(!cellID > this.state.curGrid.length -this.state.x){
      touchs[2] = true;
    }
    if(!cellID < this.state.y){
      touchs[1] = true;
    }
    if(!cellID > this.state.curGrid.length -this.state.y){
      touchs[3] = true;
    }
    debugger
    if(touchs[0] === false){
      holdingArr.push(gridArr[cellID -this.x].alive)
      if(touchs[1]===false){
        holdingArr.push(gridArr[cellID -this.x +1 ].alive)
      }
      if(touchs[3]===false){
        holdingArr.push(gridArr[cellID -this.x -1 ].alive)
      }
    }
    if(touchs[2] === false){
      holdingArr.push(gridArr[cellID +this.x].alive)
      if(touchs[1]===false){
        holdingArr.push(gridArr[cellID +this.x +1 ].alive)
      }
      if(touchs[3]===false){
        holdingArr.push(gridArr[cellID +this.x -1 ].alive)
      }
    }
    if(touchs[1] === true){
      holdingArr.push(gridArr[cellID + 1].alive)
    }
    if(touchs[3] === true){
      holdingArr.push(gridArr[cellID -1].alive)
    }
    const cellcount = holdingArr.filter(i=>i===true).length;
    if(cellcount === 3){
      return true;
    }
    if(cellcount === 2 && !gridArr[cellID]){
      return true
    }
    return false;
  }
  arrayCalc = (arr)=>{
    return arr.map((e,i,a)=>{
      return {alive:this.determineLife(i,a), color:e.color,isClickable:false}
    })
  }
  gameLoop = ()=>{
      this.setState({
        curGrid: this.state.nextGrid,
        nextGrid:this.state.afterNextGrid,
        afterNextGrid:this.arrayCalc(this.state.nextGrid)
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
  stop = ()=>{
    clearInterval(this.state.intervalID);
    this.setState({
      running: false
    })
    
  }
  newSim = ()=>{
    this.setState({
      running: true,
      nextGrid:this.arrayCalc(this.state.curGrid)
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

       <button onClick={this.stop}>Stop</button>
      </div>
    );
  }
}

export default App;
