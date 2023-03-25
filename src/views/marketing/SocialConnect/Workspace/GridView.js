import React, { Fragment, useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'react-feather';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import { getComposePost } from '../../../../requests/Planable';
import '../../../../assets/styles/socialconnect.scss';

const GridView = () => {
  const [data, setData] = useState([]);

  const getCompose = async () => {
    await getComposePost().then((response) => {
      setData(response);
    });
  };

  useEffect(() => {
    getCompose();
  }, []);

  return (
    <Fragment>
      <Row>
        {data ? (
          <>
            {data?.map((value, i) => (
              <Col sm={3} md={3} lg={3}>
                <Card className="p-1">
                  <CardHeader>{value?.desc}</CardHeader>
                  <div className="">
                    <div className="gd-view">
                      <img src={value?.media_img[0]} alt="post4" width="100%" />
                    </div>
                    <div className="grid-icon">
                      <CheckCircle className="me-1" />
                      <Clock />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </>
        ) : (
          <>
            <h3>Loading...</h3>
          </>
        )}
      </Row>
    </Fragment>
  );
};
export default GridView;
