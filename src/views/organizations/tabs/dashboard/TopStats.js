import React, { Fragment } from 'react'

import { Copy, User, UserCheck, UserPlus, UserX } from 'react-feather';

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import { Col, Row } from 'reactstrap';


export default function TopStats() {
  return (
    <Fragment>
    <div className="app-user-list">
     <Row>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="primary"
             statTitle="Total Users"
             icon={<User size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">20</h3>}
           />
     </Col>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="danger"
             statTitle="Total Sales"
             icon={<UserPlus size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">20</h3>}
           />
     </Col>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="success"
             statTitle="Total "
             icon={<UserCheck size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">20</h3>}
           />
     </Col>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="warning"
             statTitle="Something"
             icon={<UserX size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">20</h3>}
           />
     </Col>
     </Row>
    </div>
   
   </Fragment>
  )
}
