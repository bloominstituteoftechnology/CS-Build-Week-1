import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

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
                <Row>
                    <Col>.col</Col>
                    <Col>.col</Col>
                    <Col>.col</Col>
                    <Col>.col</Col>
                </Row>
                <Row>
                    <Col xs="3">.col-3</Col>
                    <Col xs="auto">.col-auto - variable width content</Col>
                    <Col xs="3">.col-3</Col>
                </Row>
                <Row>
                    <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                    <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                    <Col sm="4">.col-sm-4</Col>
                </Row>
                <Row>
                    <Col sm={{ size: 6, order: 2, offset: 1 }}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>.col-sm-12 .col-md-6 .offset-md-3</Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
                    <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
                </Row>
            </Container>
        );
    }
}

export default Home;