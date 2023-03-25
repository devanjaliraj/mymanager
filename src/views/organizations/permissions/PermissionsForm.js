import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Col, Input, Row } from 'reactstrap';
import { addPermissionsAction, getElementsByOrgAction } from '../store/action';


export default function PermissionsForm({ dispatch, stepper, org, setOrg }) {
  const [permissions, setPermissions] = useState([]);
  const handleOnChange = (e, row) => {
    let p = permissions;
    p = permissions.map((x) => {
      let i = x;
      if (i.module === row.module) {
        i = { ...i, [e.target.name]: e.target.checked };
      }
      return i;
    });
    setPermissions(p);
  };
  const handleSubmitPermissions = () => {
    console.log(permissions)
    dispatch(addPermissionsAction(permissions)).then(res=>{
        console.log(res)
        setOrg({...org,permissions:res})
    })
  };

  useEffect(() => {
    if (org._id !== undefined) {
      if (permissions.length === 0) {
        dispatch(getElementsByOrgAction(org._id)).then(res=>{
            let ps = [];
            for (const element of res) {
                ps.push({
                    module:element.defaultId,
                    read: true,
                    write: true,
                    create: true,
                    delete: true,
                    elementId:element._id,
                    organizationId:org._id
                })
            }
            setPermissions(ps)
        })
      }
    }
  }, [org]);
  const columns = [
    {
      name: 'MODULE',
      selector: (row) => row.module,
      width: '20%',
      cell: (row) => <span>{row.module}</span>
    },
    {
      name: 'READ',
      selector: (row) => row.read,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={permissions?.find((x) => x.module === row.module)?.read}
          name="read"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'WRITE',
      selector: (row) => row.write,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={permissions?.find((x) => x.module === row.module)?.write}
          name="write"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'CREATE',
      selector: (row) => row.create,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={permissions?.find((x) => x.module === row.module)?.create}
          name="create"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'DELETE',
      selector: (row) => row.delete,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={permissions?.find((x) => x.module === row.module)?.delete}
          name="delete"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    }
  ];
  return (
    <Fragment>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className="task-application">
            <div className="list-group task-task-list-wrapper">
              <DataTable
                striped
                noHeader
                responsive
                className="react-dataTable"
                columns={columns}
                data={permissions}
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="d-flex justofy-conten-end">
        <Button color="primary mt-50" onClick={handleSubmitPermissions}>
          Submit
        </Button>
      </div>
    </Fragment>
  );
}
