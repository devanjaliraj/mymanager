import React, { Fragment, useEffect, useState } from 'react';

import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import { Calendar, File, Plus, Settings, Users } from 'react-feather';

// ** STYLES
import '@styles/react/apps/app-users.scss';
import Dashboard from './tabs/dashboard/Dashboard';
import Organizations from './tabs/orgs/Organizations';

import { useDispatch, useSelector } from 'react-redux';
import Plans from './plans/Plans';
import { getOrgsAction } from './store/action';
import NoOrgs from './orgs/noOrgs/NoOrgs';

const Organization = () => {
  
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  //STORE
  const store = useSelector(state=>state.organizations)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrgsAction())
  },[])
  return (
    <Fragment>
      <Row className='w-100'>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} >
          {store?.myOrgs?.length>0?
            (<Fragment>
              <Nav pills className="mb-2">
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <Users className="font-medium-1 me-50" />
                    <span className="fs-6">Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <Plus className="font-medium-1 me-50" />
                    {/* <span className="fs-6">My Forms</span> */}
                    <span className="fs-6">Organizations</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                    <Calendar className="font-medium-1 me-50" />
                    <span className="fs-6">Permissions</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                    <File className="font-medium-1 me-50" />
                    <span className="fs-6">Plans</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
                    <Settings className="font-medium-1 me-50" />
                    <span className="fs-6">Events</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                    <Settings className="font-medium-1 me-50" />
                    <span className="fs-6">Setting</span>
                  </NavLink>
                </NavItem>
              </Nav>
  
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <Dashboard/>
                </TabPane>
                <TabPane tabId="2">
                  <Organizations store={store} dispatch={dispatch}/>
                </TabPane>
                <TabPane tabId="3">
                Permissions
                </TabPane>
                <TabPane tabId="4">
                <Plans/>
                </TabPane>
                <TabPane tabId="6">
                Events
                </TabPane>
                <TabPane tabId="5">
                Setting
                </TabPane>
              </TabContent>
            </Fragment>):<NoOrgs store={store} dispatch={dispatch}/>
          }
        </Col>
      </Row>
      
    </Fragment>
  );
};

export default Organization;
