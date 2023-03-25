import React, { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Plus } from 'react-feather';
import { Button, Col, Row } from 'reactstrap';
import NewPlanModal from '../../../../../../plans/NewPlanModal';


const data = [
  {
    name: 'Basic',
    description: 'When you just want the basics',
    price: 0
  },
  {
    name: 'Essentials',
    description: 'when you need more power',
    price: 80
  }
];

export default function PlansTab({ selectedOrg }) {
  const [openAddPlan, setOpenAddPlan] = useState(false);

  const toggleAddPlan = () => setOpenAddPlan(!openAddPlan);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '30%'
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      width: '40%'
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      width: '20%',
      cell: (row) => <span>{row?.price === 0 ? 'Always Free' : `${row.price} $/month`}</span>
    }
  ];
  return (
    <Fragment>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className="task-application">
            {data ? (
              <div className="list-group task-task-list-wrapper">
                <div className='d-flex justify-content-end my-50'>
                  <Button color="primary" onClick={toggleAddPlan}>
                    <Plus /> New Plan
                  </Button>
                </div>
                <DataTable
                  noHeader
                  responsive
                  className="react-dataTable"
                  columns={columns}
                  data={data}
                />
              </div>
            ) : (
              <div className="text-center">
                <p>You didn't create any plan yet!</p>
                <Button color="primary" onClick={toggleAddPlan}>
                  <Plus /> New Plan
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <NewPlanModal open={openAddPlan} toggle={toggleAddPlan} />
    </Fragment>
  );
}
