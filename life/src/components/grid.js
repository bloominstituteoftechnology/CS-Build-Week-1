import React , { Component } from 'react'
import styled from 'styled-components'
import Cube from './cube'

export default class Grid extends Component {
    constructor(props){
        super(props)
        this.state = {
            array: [],
            nextArray: [],
            generations: 0,
            width: 15,
        }
    }

    componentDidMount(){
        let width = this.state.width;
        let newArr = [];
        for (let i = 1; i < width*width +1; i++){
            // if(i % 2 > 0){
                newArr.push({id: i, active: false})
            // } else {
                // newArr.push({id: i, active: true})
            // }
        }
        this.setState({
            array: newArr
        })
    }

    toggle = (cubeNum) => {
        let current = this.state.array[cubeNum-1].active;
        let newArr = this.state.array;
        newArr[cubeNum-1] = {id: +cubeNum, active: !current} 
        this.setState({
            nextArray: newArr,
        })
    }

    get8surrounding = (target, isActive=false) => {
        console.log(target)
        let surrounding = [];
        // console.log(surrounding)
        surrounding.push(+target.id-this.state.width-1)
        surrounding.push(+target.id-this.state.width)
        surrounding.push(+target.id-this.state.width+1)
        surrounding.push(+target.id-1)
        surrounding.push(+target.id+1)
        surrounding.push(+target.id+this.state.width-1)
        surrounding.push(+target.id+this.state.width)
        surrounding.push(+target.id+this.state.width+1)
        console.log(surrounding, "surrounding")
        let clean = [];
        surrounding.forEach(cube_id => {
            if(cube_id> 0 && cube_id < 226){
                if(isActive){
                    if(this.state.array[cube_id-1].active === true){
                        clean.push(this.state.array[cube_id-1])
                    }
                } else {
                    clean.push(this.state.array[cube_id-1])
                }
            }
            //something for left side
        })
        return clean
    }

    toggle8 = async (cubeNum) => {
        // console.log(this.state)
        await this.setState({
            nextArray: this.state.array
        });
        // console.log(this.state)
        let nextGen = this.state.generations+1;
        let surr = this.get8surrounding(cubeNum);
        // console.log(surr)
        await surr.forEach(cube => {
            this.toggle(cube);
        })
        // console.log(this.state)
        await this.setState({
            array: this.state.nextArray,
            nextArray: [],
            generations: nextGen
        })
        console.log(this.state)
    }

    getActives(){
        let newArr = [];
        this.state.array.forEach(cube => {
            if(cube.active === true){
                newArr.push(cube)
            }
        })
        console.log(newArr)
        return newArr;
    }

    buildNext = async (cubeNum) => {
        console.log("build next", this.getSelected())
        // console.log(this.state)
        await this.setState({
            nextArray: this.state.array
        });
        // console.log(this.state)
        let nextGen = this.state.generations+1;
        let questionables = [];
        let actives = this.getActives();
        questionables = actives;
        console.log("actives", actives)
        actives.forEach(cube => {
            let surrounding = this.get8surrounding(cube);
            console.log(surrounding, "surr")
            surrounding.forEach(neighbor => {
                console.log(neighbor, "neighbor")
                // if(questionables.includes(neighbor)){
                //     //do nothing 
                // } else {
                    questionables.push(neighbor);
                // }
            })
        })
        console.log("questionables", questionables);
        await questionables.forEach(cube => {
            console.log("?s forloop", cube)
            this.cubeNextTime(cube);
        })
        console.log(this.state)
        await this.setState({
            array: this.state.nextArray,
            nextArray: [],
            generations: nextGen
        })
        console.log(this.state)
    }

    cubeNextTime(cube){
        //get neighbors
        let activeNeighbors = this.get8surrounding(cube, true);
        let newArr = this.state.nextArray;
        console.log(cube)
        if(cube.active){
            //stay allive if 2 0r 3 neighbors
            console.log(cube.id, "is active and so are ",activeNeighbors.length," neighbores")
            if(1 < activeNeighbors.length && activeNeighbors.length < 4){
                newArr[cube.id-1] = {id: cube.id, active: true}
                console.log("so in the next arr", newArr[cube.id-1] , "will be ",{id: cube.id, active: true})
            } else {
                //else die
                newArr[cube.id-1] = {id: cube.id, active: false}
            }
        } else {
            //switch to alive if 2 neighbors
            console.log(cube.id, "is dead but",activeNeighbors.length," neighbores are alive")
            if(activeNeighbors.lenght == 3){
                newArr[cube.id-1] = {id: cube.id-1, active: true}
                console.log("so in the next arr", newArr[cube.id-1] , "will be ",{id: cube.id, active: true})
            }
            //else die
        }
        //assign cube number to next Array 
        this.setState({
            nextArray: newArr,
        })
    }

    clear(){
        let newArr = this.state.array;
        newArr.forEach(cube => {
            cube.active = false;
        })
        this.setState({
            array: newArr,
            generations: 0,
        })
    }

    getSelected(){
        let curr = [];
        this.state.array.forEach(cube => {
            if(cube.active === true){
                curr.push(cube.id)
            }
        })
        return curr
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
                this.clear();
                break;
            default: 
                // console.log("default");
                console.log("toggle", e.target.name);
                this.toggle(e.target.name);
        }
    }

    render(){
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
                    {this.state.array.map(cube => {
                        return <Cube clickHandler={this.clickHandler} name={cube.id} key={cube.id} active={cube.active} />
                    })}
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