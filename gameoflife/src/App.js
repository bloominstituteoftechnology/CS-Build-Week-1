import React, { Component } from 'react';
import axios from 'axios';
import Board from './components/board/board.js';
import Form from './components/controls/form.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      rows: 20,
      cols: 20,
      strippedData: [],
      generation: 0
    }
  }


  componentDidMount(){
    axios.get('http://www.raymondgrc.com/cgi-bin/helloworld.pl', {
      params: {
        iterations: 100
      }
    })
    .then(response =>{
      this.setState({game: response.data})
      let strippedData = []
      this.state.game.forEach((instance, index) => {
        strippedData[index] = instance.join('');
      })
      this.setState({strippedData: strippedData})
    })
    .catch(err => console.log(err))
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

  }

  updateGridDimension = (event) =>{
    event.preventDefault();
    const data = new FormData(event.target);
    this.setState({
      rows: data.get('rows'),
      cols: data.get('columns')
    });

    document.querySelector("html").style.setProperty("--rowNum", data.get('rows'));
    document.querySelector("html").style.setProperty("--colNum", data.get('columns'));
  }
  render() {
    return (
      <div className="App">
          <div onClick={() => setInterval(this.colorCells, 350)}>Click Me</div>
          <Form updateGridDimension={this.updateGridDimension}/>
          <Board rows={this.state.rows} cols={this.state.cols}/>
      </div>
    );
  }
}

export default App;
