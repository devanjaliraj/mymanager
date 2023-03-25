import React, { useState } from 'react';
import { CheckCircle, Delete } from 'react-feather';
import { Button, Col, Input, Row } from 'reactstrap';
import NumPadCell from './NumPadCell';

const NumPad = () => {

    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <Row className='d-flex mb-2 justify-content-center' style={{fontSize: '28px', fontWeight: 'bold', color: 'white'}}>
                Check-In
            </Row>
            <Row className='mb-2'>
                <Input value={inputValue} className='rounded-left px-2 py-1' style={{borderRadius: '50px', backgroundColor: '#3e475e', color: 'white'}} placeholder='Enter check-in code...'/>
            </Row>
            <Row className='mb-2'>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>1</NumPadCell></Col>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>2</NumPadCell></Col>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>3</NumPadCell></Col>
            </Row>
            <Row className='mb-2'>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>4</NumPadCell></Col>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>5</NumPadCell></Col>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>6</NumPadCell></Col>
            </Row>
            <Row className='mb-2'>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>7</NumPadCell></Col>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>8</NumPadCell></Col>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>9</NumPadCell></Col>
            </Row>
            <Row className='mb-2'>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue} isDelete ><Delete /></NumPadCell></Col>
                <Col><NumPadCell inputValue={inputValue} setInputValue={setInputValue}>0</NumPadCell></Col>
                <Col><NumPadCell><CheckCircle /></NumPadCell></Col>
            </Row>
            <Row className='mb-2'>
                <Button color='primary' style={{ borderRadius: '50px'}}>Check In</Button>
            </Row>
        </div>
    )
}

export default NumPad;