import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { getOrgByIdAction, getOrgsAction } from '../../../../store/action';
import OrgInfoCard from './components/OrgInfoCard';
import OrgStatus from './components/OrgStatus';
import OrgTabs from './components/OrgTabs';

export default function OrgDetails() {
  const [org, setOrg] = useState(null);
  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // ** Storage
  const store = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    // if (store && id) {
    //   setOrg(store.myOrgs.find((x) => x._id.toString() === id));
    // }
    dispatch(getOrgByIdAction(id)).then(data=>{
      setOrg(data[0])
    })
dispatch(getOrgsAction())
  }, [ id,dispatch]);

  // return org !== null && org!== undefined?(
  //   <div>OrgDetails</div>
  // ): (
  //   <div>
  //     <h4 className="alert-heading">No data available</h4>

  //   </div>
  // )
  //xs={{ order: 1 }} md={{ order: 0, size: 5 }}
  return (
    <div className="app-user-view w-100">
      <Row>
        {org && org!==null && (
          <>
            <Col xl="4" lg="5">
              <OrgInfoCard selectedOrg={org} />
              <OrgStatus cols={{ md: '6', sm: '6', xs: '12' }} />
            </Col>
            <Col xl="8" lg="7">
              <OrgTabs selectedOrg={org} active={active} toggleTab={toggleTab} dispatch={dispatch} store={store}/>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}
