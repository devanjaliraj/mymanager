import React, { useState } from 'react';
import { Input, Row } from 'reactstrap';
import RecentCheckInItem from './RecentCheckInItem';

const NameSearch = () => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div>
            <Row className='d-flex mb-2 justify-content-center' style={{fontSize: '28px', fontWeight: 'bold', color: 'white'}}>
                Name Search
            </Row>
            <Row className='mb-2'>
                <Input value={inputValue} className='rounded-left px-2 py-1' style={{borderRadius: '50px', backgroundColor: '#3e475e', color: 'white'}} placeholder='Enter name to search...'/>
            </Row>
            <RecentCheckInItem />
            <RecentCheckInItem />
            <RecentCheckInItem />
        </div>
    )
}

export default NameSearch;