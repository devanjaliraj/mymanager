import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import ShiftItem from './ShiftItem';

const Shift = () => {
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div>
      <Nav tabs className="mb-2 ">
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <span className="fs-6">In Progress</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            {/* <span className="fs-6">My Forms</span> */}
            <span className="fs-6">Upcoming</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <ShiftItem />
          <ShiftItem />
          <ShiftItem />
          <ShiftItem />
        </TabPane>
        <TabPane tabId="2">
          <ShiftItem />
          <ShiftItem />
          <ShiftItem />

        </TabPane>
      </TabContent>
    </div>
  );
};

export default Shift;
