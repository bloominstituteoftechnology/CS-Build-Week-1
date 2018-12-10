import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'; 
import Cell from './Cell'; 

const App_Holder = styled.div`
border: 1px solid black; 
display: flex; 
flex-direction: column; 
flex:1;
`
const Header_container = styled.header`
border: 1px solid red; 
display: flex; 
flex-direction: column; 
flex: 1; 
`
const Btn = styled.button`
width: 100px; 
padding: 10px; 
margin: 5px; 
`
const Inner_Header = styled.header`
border: 1px solid green; 
display: flex; 
width: auto;
heigth: auto;  
`
const Input = styled.input`
width: 100px; 
height: 20px;
margin: 5px; 
`
const Btn_container = styled.div`
border: 1px solid blue; 
display: flex; 
width: auto; 
height: auto; 
`
const Header_text = styled.div`
border: 1px solid yellow; 
width: auto; 
`
const Board_Container = styled.div`
border: 1px solid pink; 
display: flex; 
flex: 1; 
justify-content: center; 
padding: 0 60px; 
`

class App extends Component {
  constructor(){
    super();
    this.state = {
      //-----i    j  i=Column j=Row  
      size: [90, 30],
      running: false,
    }
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
  }

      handleColumnChange(event){
        //if the game is running
        //form a column that is according to the value of size
        //if the column is less than 90
        //then that will be the new size of the column
        //if the column size is larger than 90 then default to 90.
        if(!this.state.running){
          let newSize = this.state.size; 
          if(event.target.value < 90){
            newSize[0] = this.state.size;
          }else{
            newSize[0] = 90; 
          }
          this.setState({
            size: newSize,
          });
          this.renderBoard(); 
        }
      };

      handleRowChange(event){
        //if the game is running
        //form a row that is according to the value of size
        //if the row is less than 20
        //then that will be the new size of row
        //if the row size is larger than 20 then default to 20.
        if(!this.state.running){
          let newSize = this.state.size;
          if(event.target.value < 30){
            newSize[1] = this.state.size;
          }else{
            newSize[1] = 20;
          }
          this.setState({
            size: newSize,
          });
          this.renderBoard();
        }
      };

      startGame(){
        //if the game is running
        //set the state of running to true
          this.setState({
            running: true, 
          })
      };

      stopGame(){
        //if the game is running
        //set the state of running to false
        if(!this.state.running){
          this.setState({
            running: false,
          })
        }
      };

      renderBoard(){
        //two empty arrays
        //one for a new board 
        //and another for the individual rows
        let newBoard = [];
        let cellRow = []; 
        //loop through twice to the row and column sizes.
        for(let i = 0; i < this.state.size[0]; i++){
          for(let j = 0; j < this.state.size[1]; j++){
            //push the cells into the board made.
            cellRow.push(<Cell key={[i, j]}/>);
          }
          //create the new board 
          newBoard.push(<div className="row" key={i}>{cellRow}</div>);
          cellRow = []; 
        }
        return newBoard; 
      };

  render() {
    return (
      <App_Holder>
        <Header_container>
          {/* <Btn>Submit</Btn> */}
            <Inner_Header>
              <Input 
              type = "number"
              placeholder = "Rows"
              value = {this.state.size[1]}
              onChange={this.handleRowChange}
              />
              <Input 
              type = "number"
              placeholder = "Columns"
              value = {this.state.size[0]}
              onChange = {this.handleColumnChange}
              />
            </Inner_Header>
            <Btn_container>
              <Btn onClick={this.startGame}>Start</Btn>
              <Btn onClick={this.stopGame}>Stop</Btn>
            </Btn_container>
            <Header_text>
              <h3>Generations:</h3>
              </Header_text>
        </Header_container>
        <Board_Container>
          {this.renderBoard()}
        </Board_Container>
      </App_Holder>
    );
  }
}

export default App;
