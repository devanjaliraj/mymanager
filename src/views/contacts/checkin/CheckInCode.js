import React, { Fragment, useState } from 'react';
import { Plus, Users } from 'react-feather';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import NameSearch from './NameSearch';
import NumPad from './NumPad';
import RecentCheckIn from './RecentCheckIn';

const CheckInCode = () => {
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <div className="h-100 w-100 d-flex justify-content-center">
      <div>
        <Nav tabs className="mb-2 ">
          <NavItem>
            <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
              <span className="fs-6">Enter Code</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
              {/* <span className="fs-6">My Forms</span> */}
              <span className="fs-6">Name Search</span>
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <NumPad />
          </TabPane>
          <TabPane tabId="2">
            <NameSearch />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default CheckInCode;
