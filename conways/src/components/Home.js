import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Display from './Display';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container className='containerWrapper'>
                <Row>
                    <Col><h2>Conway's Game of Life</h2></Col>
                </Row>
                <Row className='displayFlex'>
                    <Col xs="6" className='centerContent'><h3>Generation: #</h3></Col>
                    <Col xs="6" className='centerContent'><h3>Rules</h3></Col>
                </Row>
                <Row className='displayFlex'>
                    <Col xs="3">
                        <Display /></Col>
                    <Col xs="auto" className='dirColumn'>
                        <button className='presetBut'>Preset 1</button>
                        <button className='presetBut'>Preset 2</button>
                        <button className='presetBut'>Preset 3</button>
                        <button className='presetBut'>Preset 4</button>
                    </Col>
                    <Col xs="3">
                        <ul>
                            <li>some content</li>
                            <li>some content</li>
                            <li>some content</li>
                            <li>some content</li>
                            <li>some content</li>
                            <li>some content</li>
                            <li>some content</li>
                            <li>some content</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3" className='thirtyPer displayFlex'>
                        <button className='playB'>Play</button>
                        <button className='playB'>Pause</button>
                        <button className='playB'>Stop</button>
                    </Col>
                    <Col xs="9"></Col>
                </Row>
                <Row>
                    <Col><h3>About this Algorithm:</h3></Col>
                </Row>
                <Row>
                    <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Col>
                </Row>

            </Container>
        );
    }
}

export default Home;