import React, { useState } from 'react';
import { Input, Row } from 'reactstrap';

import RecentCheckInItem from './RecentCheckInItem'

const RecentCheckIn = () => {

    return (
        <div>
            <RecentCheckInItem />
            <RecentCheckInItem />
            <RecentCheckInItem />
            <RecentCheckInItem />
        </div>
    )
}

export default RecentCheckIn;