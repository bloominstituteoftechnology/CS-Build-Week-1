import React , { Component } from 'react'
import styled from 'styled-components'
import Cube from './cube'

export default class GridObject extends Component {
    constructor(props){
        super(props)
        this.state = {
            generations: 0,
            width: 15,
            length: this.width*this.width,
            array: [],
            allFalse: {}
        }
    }

    componentDidMount(){
        this.init();
    }

    init(){
        console.log("INIT\n\n\n\n\n\nppppppppppppp\n\n\n")
        let width = this.state.width;
        let initObj = {}
        let falseObj = {}
        let nexObj = {};
        let i;
        let nextArray = [];
        for (i = 0; i < width*width; i++){
            initObj[i] = false;
            falseObj[i] = false;
            nextArray[i] = i;
            nexObj[i] = false;

        }
        // console.log(nextObj)
        this.setState({
            curObj: initObj,
            length: i,
            array: nextArray,
            nexObj: initObj,
            generations: 0,
            allFalse: falseObj
        })
    }

    toggle = (cubeNum) => {
        console.log("toggle1", this.state.allFalse[0])
        let monkey = {};
        monkey = this.state.curObj
        console.log("toggle1", this.state.allFalse[0])
        let curr = null;
        curr = this.state.curObj[cubeNum];
        monkey[cubeNum] = !curr;
        console.log("toggle2", this.state.allFalse[0])
        this.setState({
            curObj: monkey
        })
        console.log("toggle3", this.state.allFalse[0])
    }

    //#1
    async buildNext(){
        // this.initNextObj()
        let selected = 0;
        selected = this.getSelected();
        console.log(selected, "selected");
        let questionables = this.getQuestionables(selected);
        // console.log(questionables, "questionables");
        await questionables.forEach(num => {
            this.cubeNextTick(num);
        })
        let allFalse = {}
        allFalse = this.state.allFalse;
        console.log("\n\n-------buildnext 1----------\n\n", this.state)
        this.setState({
            curObj: this.state.nexObj,
            nexObj: allFalse,
            generations: this.state.generations+1,
        })
        console.log("\n\n-------buildnext 2----------\n\n", this.state)
    }

    //#4 goes through every object in the questionables array
    cubeNextTick(num){
        console.log("num", num)
        let activeNeighbors = 0;
        activeNeighbors = this.countNeighbors(num);
        console.log("active neighbors", activeNeighbors)
        console.log(this.state.curObj,"inside cubeNextTick")
        if(this.state.curObj[num] === true){//is alive
            if(activeNeighbors === 2 || activeNeighbors === 3){
                let newNexObj = this.state.nexObj;
                newNexObj[num] = true;
                this.setState({
                    nexObj: newNexObj
                })
            } else {
                let newNexObj = this.state.nexObj;
                newNexObj[num] = false;
                this.setState({
                    nexObj: newNexObj
                })
            }
        } else {//is dead
            if(activeNeighbors === 3) { 
                console.log(num, "has 3 neighbors")
                let newNexObj = this.state.nexObj;
                newNexObj[num] = true;
                this.setState({
                    nexObj: newNexObj
                })
            } else {
                //do nothing
            }
        }
    }

    countNeighbors(num){
        let surrounding = [];
        surrounding.push(this.state.curObj[num-this.state.width-1]);
        surrounding.push(this.state.curObj[num-this.state.width]);
        surrounding.push(this.state.curObj[num-this.state.width+1]);
        surrounding.push(this.state.curObj[num-1]);
        surrounding.push(this.state.curObj[num+1]);
        surrounding.push(this.state.curObj[num+this.state.width-1]);
        surrounding.push(this.state.curObj[num+this.state.width]);
        surrounding.push(this.state.curObj[num+this.state.width+1]);
        let count = 0;
        surrounding.forEach(bool => {
            if(bool == true){
                count = count +1;
            }
        })
        return count;
    }
    //#2
    getSelected(){
        let curr = [];
        this.state.array.forEach(num => {
            if(this.state.curObj[num] === true){
                curr.push(num)
            }
        })
        return curr
    }
    //#3
    getQuestionables(selected){
        let questionables = selected;
        selected.forEach(selectedNum => {
            this.checkDuplicates(questionables, selectedNum+1)
            this.checkDuplicates(questionables, selectedNum-1)
            this.checkDuplicates(questionables, selectedNum-this.state.width)
            this.checkDuplicates(questionables, selectedNum-this.state.width-1)
            this.checkDuplicates(questionables, selectedNum-this.state.width+1)
            this.checkDuplicates(questionables, selectedNum+this.state.width)
            this.checkDuplicates(questionables, selectedNum+this.state.width-1)
            this.checkDuplicates(questionables, selectedNum+this.state.width+1)
        })
        console.log("questionables at end of loop", questionables)
        return questionables;
    }

    checkDuplicates(qArray, num){
        if(qArray.includes(num)){
            //do nothing
        } else {
            if(num < 0){
                //do nothing 
            } else {
                qArray.push(num)
            }
        }
    }

    clickHandler = (e) => {
        e.preventDefault();
        switch(e.target.name){
            case "start":
                console.log("start");
                break;
            case "stop":
                console.log("stop");
                break;
            case "next":
                console.log("next");
                this.buildNext();
                break;
            case "clear":
                console.log("clear");
                this.init();
                break;
            default: 
                // console.log("default");
                console.log("toggle", e.target.name);
                this.toggle(e.target.name);
                break;
        }
    }

    render(){
        console.log(this.state)
        return(
            <GridDiv> 
                Generation: {this.state.generations}
                <div className="buttons">
                    <button name="start" onClick={this.clickHandler}>start</button>
                    <button name="stop" onClick={this.clickHandler}>stop</button>
                    <button name="next" onClick={this.clickHandler}>next</button>
                    <button name="clear" onClick={this.clickHandler}>clear</button>
                </div>
                <div className="cubesBin">
                    {this.state.curObj ? this.state.array.map(num => {
                        return <Cube key={num} clickHandler={this.clickHandler} name={num} active={this.state.curObj[num]} />
                    }): null}
                </div>
            </GridDiv>
        )
    }
}

const GridDiv = styled.div`
    .cubesBin{
        border: 1px solid blue;
        box-sizing: border-box;
        width: 392px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
`