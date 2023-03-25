import React, { Fragment, useState, useEffect } from 'react';
import { PlusCircle, Trash } from 'react-feather';
import { Card, CardFooter, Col, Row } from 'reactstrap';

import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import '../../../assets/styles/socialconnect.scss';
import { deleteOneWorkspace, workSpaceListAll } from '../../../requests/Planable';

const SocialConnectMain = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await workSpaceListAll().then((response) => {
      setData(response);
    });
  };
  const handledelete = async (id) => {
    await deleteOneWorkspace(id).then((response) => {
      fetchData();
    });
  };

  return (
    <>
      <Fragment>
        <div>
          <div className="d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center me-1"
              style={{
                borderRadius: '6px',
                width: '40px',
                height: '40px',
                backgroundColor: '#e52a2a',
                color: '#fff'
              }}
            >
              <span style={{ fontSize: '20px' }}>
                <b>M</b>
              </span>
            </div>
            <span>
              <b>Your Workspace</b>
            </span>
            <br />
          </div>
        </div>
        <div
          className="mt-1"
          style={{ borderTop: '1px solid #b8c2cc', borderBottom: '1px solid #b8c2cc' }}
        >
          <Row className="mt-2">
            <Col sm={3} md={3} lg={3}>
              <Link to="/createworkspace">
                <Card className="cursor-pointer" style={{ height: '200px' }}>
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <PlusCircle size={30} />
                      </div>
                      <div>
                        <span>Create New WorkSpace</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>

            {data &&
              data?.map((value) => (
                <Col sm={3} md={3} lg={3}>
                  <div key={value?._id}>
                    <Card className="cursor-pointer p-1" style={{ height: '200px' }}>
                      <div className="d-flex align-items-center">
                        <Link to={`/socialview/${value?._id}`}>
                          <div
                            className="d-flex justify-content-center align-items-center me-1"
                            style={{
                              borderRadius: '6px',
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#e52a2a',
                              color: '#fff'
                            }}
                          >
                            <span style={{ fontSize: '20px' }}>
                              <b>T</b>
                            </span>
                          </div>
                        </Link>
                        <Link to={`/socialview/${value?._id}`}>
                          <div>
                            <b> {value?.workspacename.slice(0, 15)}</b>
                            <br />
                            <span>5 Pages</span>
                          </div>
                        </Link>
                        <div className="delete_work deletespace">
                          <Trash
                            fontSize={8}
                            color="red"
                            onClick={() => {
                              handledelete(value._id);
                            }}
                          />
                        </div>
                      </div>
                      <Link to={`/socialview/${value?._id}`}>
                        <CardFooter
                          className="mt-3"
                          onClick={() => {
                            handleid(value?._id);
                          }}
                        >
                          <Moment format="ll">{value?.createdAt}</Moment>
                        </CardFooter>
                      </Link>
                    </Card>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Fragment>
    </>
  );
};
export default SocialConnectMain;
