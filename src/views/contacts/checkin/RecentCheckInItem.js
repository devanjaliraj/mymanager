import React from 'react';
import Avatar from '@components/avatar'
import { User } from 'react-feather';
const RecentCheckInItem = () => {
  return (
    <div>
      <div className="d-flex flex-row mb-2 mt-2">
        <div>
          <Avatar color="light-primary" icon={<User size={32} />} className="me-1 p-1 " />
        </div>
        <div>
          <h4>John Doe</h4>
          <h5>Marketing Consultant</h5>
          <span>Mar 2, 12:30 PM</span>
        </div>
        {/* <div>
          <div className="d-flex align-items-center">
            <Avatar color="light-primary" icon={<User size={24} />} className="me-1" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">35</h4>
            </div>
          </div>
        </div> */}
      </div>
      <hr />
    </div>
  );
};

export default RecentCheckInItem;
