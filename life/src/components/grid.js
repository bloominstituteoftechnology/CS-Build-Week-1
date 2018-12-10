import React , { Component } from 'react'
import styled from 'styled-components'
import Cube from './cube'

export default class Grid extends Component {
    constructor(props){
        super(props)
        this.state = {
            array: []
        }
    }

    componentDidMount(){
        let width = 15;
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

        console.log("click", e.target.name)
        let newArr = this.state.array;
        let current = this.state.array[e.target.name -1].active;
        newArr[e.target.name -1] = {id: +e.target.name, active: !current}
        this.setState({
            array: newArr
        })
    }

    render(){
        console.log(this.state)
        return(
            <GridDiv> 
                {this.state.array.map(cube => {
                    return <Cube toggle={this.toggle} name={cube.id} key={cube.id} active={cube.active} />
                })}
            </GridDiv>
        )
    }
}

const GridDiv = styled.div`
    border: 1px solid blue;
    box-sizing: border-box;
    width: 392px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`