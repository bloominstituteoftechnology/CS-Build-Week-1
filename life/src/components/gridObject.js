import React , { Component } from 'react'
import styled from 'styled-components'
import Cube from './cube'

export default class GridObject extends Component {
    constructor(props){
        super(props)
        this.state = {
            width: 15,
            length: this.width*this.width,
        }
    }

    componentDidMount(){
        this.init();
    }

    componentWillReceiveProps(){
        this.setPreset()
    }

    setPreset(){
        if(this.props.preset!=null){
            this.setState({
                curObj: Object.assign({}, this.props.preset),
            })
        }
    }

    init(){
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
        this.setState({
            curObj: initObj,
            length: i,
            array: nextArray,
            nexObj: nexObj,
            generations: 0,
            allFalse: falseObj
        })
        console.log("\nINIT\n", this.state)
    }

    toggle = (cubeNum) => {
        let monkey = {};
        monkey = this.state.curObj
        let curr = null;
        curr = this.state.curObj[cubeNum];
        monkey[cubeNum] = !curr;
        this.setState({
            curObj: monkey
        })
    }

    //#1
    async buildNext(){
        console.log("buildNext Start\n", `cur obj 1 = ${this.state.curObj[1]}\n`, `nex obj 1 = ${this.state.nexObj[1]}\n`)
        // console.log("buildNext Start\n", `cur obj 16 = ${this.state.curObj[16]}\n`, `nex obj 16 = ${this.state.nexObj[16]}\n`)
        // console.log("buildNext Start\n", `cur obj 15 = ${this.state.curObj[15]}\n`, `nex obj 15 = ${this.state.nexObj[15]}\n`)
        let selected = 0;
        selected = this.getSelected();
        let questionables = this.getQuestionables(selected);
        await questionables.forEach(num => {
            this.cubeNextTick(num);
        })
        let allFalse = {}
        allFalse = this.state.allFalse;
        let curObj = {}
        curObj = Object.assign({}, this.state.nexObj)
        await this.setState({
            curObj: curObj,
            nexObj: allFalse,
            generations: this.state.generations+1,
        })
        console.log("buildNext False\n", `cur obj 1 = ${this.state.curObj[1]}\n`, `nex obj 1 = ${this.state.nexObj[1]}\n`)
        // console.log("buildNext False\n", `cur obj 16 = ${this.state.curObj[16]}\n`, `nex obj 16 = ${this.state.nexObj[16]}\n`)
        // console.log("buildNext False\n", `cur obj 15 = ${this.state.curObj[15]}\n`, `nex obj 15 = ${this.state.nexObj[15]}\n`)
    }

    //#4 goes through every object in the questionables array
    cubeNextTick(num){
        let activeNeighbors = 0;
        activeNeighbors = this.countNeighbors(num);
        if(this.state.curObj[num] === true){//is alive
            if(activeNeighbors === 2 || activeNeighbors === 3){
                console.log(num, "has 2 or 3 neighbors");
                let newNexObj = {}
                newNexObj = this.state.nexObj;
                newNexObj[num] = true;
                this.setState({
                    nexObj: newNexObj
                })
            } else {
                let newNexObj = {} 
                newNexObj = this.state.nexObj;
                newNexObj[num] = false;
                this.setState({
                    nexObj: newNexObj
                })
            }
        } else {//is dead
            if(activeNeighbors === 3) { 
                console.log(num, "has 3 neighbors");
                let newNexObj = {}
                newNexObj = this.state.nexObj;
                newNexObj[num] = true;
                this.setState({
                    nexObj: newNexObj
                })
            } else {
                console.log(num, "does not have 3 neighbors");
                let newNexObj = {}
                newNexObj = this.state.nexObj;
                newNexObj[num] = false;
                this.setState({
                    nexObj: newNexObj
                })
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
            if(bool === true){
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
                this.toggle(e.target.name);
                break;
        }
    }

    render(){
        console.log(this.props)
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
                        return <Cube key={num} color={this.props.color} clickHandler={this.clickHandler} name={num} active={this.state.curObj[num]} />
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