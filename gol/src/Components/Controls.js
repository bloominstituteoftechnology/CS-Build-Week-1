import React from 'react';
import { Form, FormGroup, Label, Col, Input, Row, Container } from 'reactstrap';
import '../App.css';

const Controls = (props) => {
    return ( 
        <Container>
        <Form>
            <Row form>
                <Col md = {4}>
                    <FormGroup>
                        <Label for="rows">Rows</Label>
                        <Input className = 'input' type = 'text' id = 'rows' name = 'rows' value = {props.rows} onChange = {props.rowsOnChange} />
                    </FormGroup>
                </Col>
                <Col md = {4}>
                    <FormGroup>
                        <Label for='rows'>Columns</Label>
                        <Input className = 'input' type = 'text' id = 'columns' name = 'columns' value = {props.columns} onChange = {props.columnsOnChange} />
                    </FormGroup>
                </Col>
                <Col md = {4}>
                    <FormGroup>
                        <Label for='interval'>Interval</Label>
                        <Input className = 'input' type = 'text' id = 'interval' name = 'interval' value = {props.interval} onChange = {props.intervalChange} />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
        </Container>
     );
}
 
export default Controls;