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
        e.preventDefault();
        console.log("click")
    }

    render(){
        console.log(this.state)
        return(
            <GridDiv> 
                {this.state.array.map(cube => {
                    return <button 
                                onClick={this.toggle} 
                                key={cube.id} 
                                active={cube.active}>{cube.id}</button>
                })}
                <button onClick={this.toggle} />
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