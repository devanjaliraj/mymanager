import React from 'react';
import Avatar from '@components/avatar'
import { User } from 'react-feather';
import { CardText } from 'reactstrap';

const ShiftItem = () => {
    return (
        <div>
            <div className='d-flex flex-row justify-content-between mb-2 mt-2'>
                <div>
                    <h4>9:00AM - 3.00 PM</h4>
                    <h5>Day shift</h5>
                    <span>6.00 hour, General Shift</span>
                </div>
                <div>
                    <div className='d-flex align-items-center'>
                        <Avatar color='light-primary' icon={<User size={24} />} className='me-1' />
                        <div className='my-auto'>
                        <h4 className='fw-bolder mb-0'>35</h4>
                        </div>
                    </div>
                </div>
                
            </div>
            <hr />
        </div>
    )
}

export default ShiftItem;