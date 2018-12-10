import React , { Component } from 'react'
import styled from 'styled-components'
import Cube from './cube'

export default class Grid extends Component {
    constructor(props){
        super(props)
        this.state = {
            array: [],
            generations: 0,
            width: 15,
        }
    }

    componentDidMount(){
        let width = this.state.width;
        let newArr = [];
        for (let i = 1; i < width*width +1; i++){
            if(i % 2 > 0){
                newArr.push({id: i, active: false})
            } else {
                newArr.push({id: i, active: true})
            }
        }
        this.setState({
            array: newArr
        })
    }

    toggle = (e) => {
        let newArr = this.state.array;
        let current = this.state.array[e.target.name -1].active;
        let nextGen = this.state.generations+1;
        this.get8surrounding(e.target.name);
        newArr[e.target.name -1] = {id: +e.target.name, active: !current}
        this.setState({
            array: newArr,
            generations: nextGen,
        })
        
    }

    get8surrounding = (target) => {
        let surrounding = [];
        surrounding.push(+target+1)
        surrounding.push(+target-1)
        surrounding.push(+target-this.state.width)
        surrounding.push(+target-this.state.width-1)
        surrounding.push(+target-this.state.width+1)
        surrounding.push(+target+this.state.width)
        surrounding.push(+target+this.state.width-1)
        surrounding.push(+target+this.state.width+1)
        console.log(surrounding)
        // return surrounding
    }

    toggle8 = (e) => {
        let newArr = this.state.array;
        let current = this.state.array[e.target.name -1].active;
        let nextGen = this.state.generations+1;

        newArr[e.target.name -1] = {id: +e.target.name, active: !current}
        
        
        
        this.setState({
            array: newArr,
            generations: nextGen,
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

    clickHandler = (e) =>{
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
                break;
            case "clear":
                console.log("clear");
                this.clear();
                break;
            default: 
                console.log("default");
                console.log("toggle");
                this.toggle(e);
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