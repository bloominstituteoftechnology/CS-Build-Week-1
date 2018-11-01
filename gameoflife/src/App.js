import React, { Component } from 'react';
import axios from 'axios';
import Board from './components/board/board.js';
import Form from './components/controls/form.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      // rows: 20,
      // cols: 20,
      strippedData: [],
      generation: 0,

    }
  }


  componentDidMount(){
    axios.get('http://www.raymondgrc.com/cgi-bin/helloworld.pl', {
      params: {
        iterations: 20,
        rows: 20,
        cols: 20
      }
    })
    .then(response =>{
      this.setState({game: response.data})
      this.parseData()
    })
    .catch(err => console.log(err))
  }
  parseData = () => {
    let strippedData = []
    this.state.game.forEach((instance, index) => {
      strippedData[index] = instance.join('');
    })
    this.setState({strippedData: strippedData})
  }

  revertCells = () => {
    let redcells = document.getElementsByClassName('redcell');
    while(redcells.length){
      redcells[0].classList.remove('redcell')
    }
  }

  colorCells = () => {
    let cells = document.getElementsByClassName('cell');
    if(this.state.generation < this.state.strippedData.length){
      this.state.strippedData[this.state.generation].split('').forEach((instance,index) => {
        if(instance === 'X'){
          cells[index].classList.add('redcell')
        }
      })
      setTimeout(() => this.revertCells(), 250)
      this.setState({generation: this.state.generation + 1})
    }
    if(this.state.generation === this.state.strippedData.length){
      clearInterval(this.intervalID);
      this.setState({generation: 0});
    }
  }

  updateGridDimension = (event) =>{
    clearInterval(this.intervalID);
    event.preventDefault();
    const data = new FormData(event.target);
    this.setState({
      rows: data.get('rows'),
      cols: data.get('columns'),
      generation: 0
    });

    document.querySelector("html").style.setProperty("--rowNum", data.get('rows'));
    document.querySelector("html").style.setProperty("--colNum", data.get('columns'));

    axios.get('http://www.raymondgrc.com/cgi-bin/helloworld.pl', {
      params: {
        iterations: 20,
        rows: data.get('rows'),
        cols: data.get('columns')
      }
    })
    .then(response =>{
      this.setState({game: response.data})
      this.parseData()
      this.makeGridDataStruct()
    })
    .catch(err => console.log(err))
  }

  makeGridDataStruct = () => {
    let gridStruct = [];
    for(let i = 0; i < this.state.cols; i++){
      gridStruct[i] = [];
      for (let j = 0; j < this.state.rows; j++)
      gridStruct[i].push(0)
    }
    console.log(gridStruct)
  }

  getGridPos = (event) => {
    let cellnumber = event.target.getAttribute('cellnumber');
    let column = (cellnumber % this.state.rows);
    let row = (cellnumber - column) / this.state.cols;
    let cords = [row, column];
    console.log(cellnumber)
    console.log(cords)
  }
  render() {
    return (
      <div className="App">
          <div onClick={() => {
              clearInterval(this.intervalID);
              this.intervalID = setInterval(this.colorCells, 350)}
            }>Click Me</div>
          <Form updateGridDimension={this.updateGridDimension}/>
          <Board rows={this.state.rows} cols={this.state.cols} getGridPos={this.getGridPos}/>
      </div>
    );
  }
}

export default App;
