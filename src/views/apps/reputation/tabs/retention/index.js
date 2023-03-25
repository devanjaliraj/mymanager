import { Button, Row, Col, Input, CardImg, Card, InputGroup, InputGroupText } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { MdOutlineAddReaction } from 'react-icons/md';
import GroupNumber from './GroupNumber';
import Filter from './Filter';
import axios from 'axios';

function AllReviews({ groupNumber, groupImage, postData, pageAccessToken }) {
  const xxll = window.innerWidth >= 1664 ? '2' : '12';
  const image = localStorage.getItem('facebookimage');
  const [comments, setComments] = useState('');
  console.log(pageAccessToken);
  useEffect(() => {
    axios
      .get(
        `https://graph.facebook.com/113684288326422_131545406540310/comments?access_token=${pageAccessToken}`
      )
      .then((resp) => {
        console.log(resp);
        if (resp?.data?.data?.length) {
          setComments(resp?.data?.data.message);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, []);

  return (
    <>
      <Card className="m-2">
        <GroupNumber groupNumber={groupNumber} />
      </Card>
      <Card className="m-2">
        <Row spacing={2} container>
          <Col item sm={8} md={8} lg={8}>
            <div>
              {postData.length > 0 ? (
                postData.map((ele, i) => {
                  return (
                    <>
                      <Card className="p-1 w-100 mb-1">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <div className="d-flex align-items-center">
                            <CardImg
                              variant="rounded"
                              src={groupImage}
                              style={{
                                height: 50,
                                width: 50
                              }}
                            />
                            <div style={{ marginLeft: '15px' }}>
                              <h5 className="mb-0">{groupNumber}</h5>
                              <small className="mt-0">
                                Left a review on <b>Facebook</b>
                              </small>
                            </div>
                          </div>
                          {/* <div>
                            <Button outline>Share</Button>
                          </div> */}
                        </div>
                        <div className="m-1">
                          <h3 className="text-center text-bold">{ele?.message}</h3>
                        </div>
                        <div>
                          <ul className="unstyled-list list-inline">
                            <b> Comments :- {comments}</b>
                            <li className="ratings-list-item me-25">s</li>
                          </ul>
                        </div>

                        <div>
                          <Row>
                            <Col xxl="1" xs="2">
                              <CardImg
                                variant="rounded"
                                src={image}
                                style={{
                                  height: 40,
                                  width: 40
                                }}
                              />
                            </Col>

                            <Col xxl="9" xs="10">
                              {' '}
                              <Card
                                className=" d-flex align-items-center w-100"
                                style={{
                                  backgroundColor: '#eaf4fe',
                                  marginLeft: '8px'
                                  // marginRight: '14px'
                                }}
                                component="form"
                              >
                                {/* <Input
                    className="ml-1 w-100"
                    placeholder="Reply to Suryasen"
                    // inputProps={{ 'aria-label': 'search google maps' }}
                  /> */}
                                <InputGroup>
                                  <Input placeholder="Reply to Suryasen" />
                                  <InputGroupText>
                                    <MdOutlineAddReaction />
                                  </InputGroupText>
                                </InputGroup>
                                {/* <Button
                    // onClick={() => {
                    //     handleSubmit();
                    // }}
                    className="ml-1"
                    style={{
                      color: '#fff',
                      background: '#0184FF',
                      borderRadius: '4px'
                    }}
                  >
                    Reply
                  </Button> */}
                                {/* <Divider style={{ height: 18 }} orientation="vertical" flexItem />
                                <Button aria-label="directions">
                                  <MdOutlineAddReaction />
                                </Button> */}
                              </Card>
                            </Col>

                            <Col xxl={xxll} xs="12">
                              <Button className="ml-1" color="primary" block>
                                Reply
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                      <hr />
                    </>
                  );
                })
              ) : (
                <div className="text-center mt-5">
                  <b>Select any one page</b>
                </div>
              )}

              {/* <Card className="p-1 w-100 mb-1">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <CardImg
                      variant="rounded"
                      src={person_2}
                      style={{
                        height: 50,
                        width: 50
                      }}
                    />
                    <div style={{ marginLeft: '15px' }}>
                      <h4 className="mb-0">Suryasen</h4>
                      <small className="mt-0">
                        Left a review on <b>Google</b>
                      </small>
                    </div>
                  </div>
                  <div>
                    <Button outline>Share</Button>
                  </div>
                </div>
                <div className="item-rating mt-1">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          {item.rating <= index ? (
                            <Star
                              className={classnames({
                                'filled-star': index + 1 <= '3',
                                'unfilled-star': index + 1 > '3'
                              })}
                            />
                          ) : (
                            <AiFillStar size={26} style={{ color: '#ff9f43' }} />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="d-flex mt-0">
                  <p>
                    I love the work you do. it is so inspiring to me.I looke forword to collaborate
                    with you guys in future. I love the work you do. it is so inspiring to me.I
                    looke forword to collaborate with you guys in future. I love the work you do. it
                    is so inspiring to me.I looke forword to collaborate with you guys in future.
                  </p>
                </div>
                <div className="">
                  <Row>
                    <Col xl="1">
                      <CardImg
                        variant="rounded"
                        src={person_1}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                    </Col>
                    <Col xl="9">
                      {' '}
                      <Card
                        className=" d-flex align-items-center w-100"
                        style={{
                          backgroundColor: '#eaf4fe'
                        }}
                        component="form"
                      >
                        <InputGroup>
                          <Input placeholder="Reply to Suryasen" />
                          <InputGroupText>
                            <MdOutlineAddReaction />
                          </InputGroupText>
                        </InputGroup>
                      </Card>
                    </Col>
                    <Col xl="2">
                      <Button className="ml-1" color="primary" block>
                        Reply
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
              <hr /> */}

              {/* <Card className="p-1 w-100 mb-1">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <CardImg
                      variant="rounded"
                      src={person_2}
                      style={{
                        height: 50,
                        width: 50
                      }}
                    />
                    <div style={{ marginLeft: '15px' }}>
                      <h4 className="mb-0">Suryasen</h4>
                      <small className="mt-0">
                        Left a review on <b>Google</b>
                      </small>
                    </div>
                  </div>
                  <div>
                    <Button outline>Share</Button>
                  </div>
                </div>
                <div className="item-rating mt-1">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          {item.rating <= index ? (
                            <Star
                              className={classnames({
                                'filled-star': index + 1 <= '3',
                                'unfilled-star': index + 1 > '3'
                              })}
                            />
                          ) : (
                            <AiFillStar size={26} style={{ color: '#ff9f43' }} />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="d-flex mt-0">
                  <p>
                    I love the work you do. it is so inspiring to me.I looke forword to collaborate
                    with you guys in future. I love the work you do. it is so inspiring to me.I
                    looke forword to collaborate with you guys in future. I love the work you do. it
                    is so inspiring to me.I looke forword to collaborate with you guys in future.
                  </p>
                </div>
                <div className="">
                  <Row>
                    <Col xl="1">
                      <CardImg
                        variant="rounded"
                        src={person_1}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                    </Col>
                    <Col xl="9">
                      {' '}
                      <Card
                        className=" d-flex align-items-center w-100"
                        style={{
                          backgroundColor: '#eaf4fe'
                        }}
                        component="form"
                      >
                        <InputGroup>
                          <Input placeholder="Reply to Suryasen" />
                          <InputGroupText>
                            <MdOutlineAddReaction />
                          </InputGroupText>
                        </InputGroup>
                      </Card>
                    </Col>

                    <Col xl="2">
                      <Button className="ml-1" color="primary" block>
                        Reply
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card> */}
            </div>
          </Col>
          <Col item sm={4} md={4} lg={4}>
            <Card>
              <Filter />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}
export default AllReviews;
