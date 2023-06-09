// ** THIS IS A CONNECTOR OF BUSSINESS & FORMS & FUNNELS

import React, { Fragment, useState } from 'react';

import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';
import BreadCrumbs from '../../@core/components/breadcrumbs';

import FormBuilder from '../formBuilder';
import ProjectManager from '../business/projects';
import QRBarcode from '../tasks/setting';

import '@src/assets/styles/business/business-tab.scss';

export default function index() {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Project Manager');
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Business Tools"
        breadCrumbParent="Business Tools"
        breadCrumbActive={title}
      />
      <Nav pills>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              setActive('1');
              setTitle('Project Manager');
            }}
          >
            Project Manager
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              setActive('2');
              setTitle('Forms & Funnels');
            }}
          >
            Forms & Funnels
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              setActive('3');
              setTitle('QR _Barcode');
            }}
          >
            QR _Barcode
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <div>
            <ProjectManager />
          </div>
        </TabPane>
        <TabPane tabId="2">
          <FormBuilder />
        </TabPane>
        <TabPane tabId="3">
          <QRBarcode />
        </TabPane>
      </TabContent>
    </Fragment>
  );
}
