import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Input, Row } from 'reactstrap';
import Profile from '../../../../assets/images/profile/post-media/2.jpg';
import banner1 from '../../../../assets/images/banner/banner-2.jpg';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiFillDelete } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import Moment from 'react-moment';
import '../../../../assets/styles/socialconnect.scss';
import {
  addComment,
  commentByPost,
  createFacebookPagePost,
  deleteComment,
  deleteCompose,
  getComposePost,
  viewOneWorkspace
} from '../../../../requests/Planable';
import { Tooltip } from 'reactstrap';
const MySwal = withReactContent(Swal);

const FeedView = (args) => {
  const [active, setActive] = useState(null);
  const [activecheck, setActivecheck] = useState(null);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [comment, setcomment] = useState([]);
  const [Id, setid] = useState('');
  const [viewOne, setViewOne] = useState({});
  const [ShowComment, setShowComment] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOp, setTooltipOp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [index, setindex] = useState('');
  const [DateTime, setDateTime] = useState('');

  const params = useParams();
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const togglesecond = () => setTooltipOp(!tooltipOp);

  const handlePost = (e, id) => {
    e.preventDefault();
    const post = {
      post: id,
      userid: '63e3a492f49ead238773ef08',
      comment: text
    };
    if (text) {
      addComment(post).then((response) => {
        setText('');
      });
      getOneComment(Id, index);
    }
    const accesstoken =
      'EAABzV3iosiIBAErn5xmRX5IbInvC4crYDgP27fZAJItZCgsACroeLsRXC78CVcKpAvZBCoZAkSGwsZCsj253IGYtXeAyitSNa5qq1s7Tf1Oni3m10K0s6gG9oZBSQBKwZA0CenMOWKGZAwl2J8TID2KnVxyhzQzCXaa2ZCU6nT3wrNF5gqthlkyDNZBujxVfb6gGSlIqakorjn8wZDZD';
    const fbpost = {
      access_token: accesstoken,
      message: text,
      page_id: 113684288326422
    };
    createFacebookPagePost(fbpost).then((response) => {});
  };
  const GetOneWorkSpace = async () => {
    setLoader(true);
    await viewOneWorkspace(params.id).then((response) => {
      if (response?.facebookData.length > 0) {
        setLoader(false);
        setViewOne(response?.facebookData[0]);
      } else if (response?.googleData.length > 0) {
        setLoader(false);
        setViewOne(response.googleData[0]);
      }
    });
  };
  const post = () => {
    const date = new Date(DateTime.toISOString());
    console.log(date);
  };

  const handleDeletePost = (id) => {
    deleteCompose(id).then((res) => {
      getCompose();
    });
  };
  const handleDelete = async (id) => {
    await deleteComment(id).then((res) => {
      getOneComment(Id, index);
    });
  };

  const getOneComment = async (id, i) => {
    setcomment('');
    setid(id);
    setindex(i);
    await commentByPost(id).then((resp) => {
      setcomment(resp);
    });
  };

  const getCompose = async () => {
    await getComposePost().then((resp) => {
      console.log(resp);
      setData(resp);
    });
  };

  useEffect(() => {
    getCompose();
    GetOneWorkSpace();
  }, [params]);

  return (
    <>
      {loader === true ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <div className="">
          <Row>
            <Col sm={3} md={3} lg={3} className="text-center">
              <Card>
                <CardBody>
                  <img
                    className="mb-1"
                    alt="profile"
                    src={viewOne?.profileImg}
                    style={{
                      border: '1px solid',
                      borderRadius: '50%',
                      width: '100%',
                      height: '20%'
                    }}
                  />
                  <span>{viewOne?.email}</span>
                  <h5>{viewOne?.profileName}</h5>
                  <h5>{viewOne?.pageName}</h5>
                </CardBody>
              </Card>
            </Col>
            <Col sm={9} md={9} lg={9}>
              <Card>
                <CardBody>
                  <div>
                    <img alt="banner" src={banner1} style={{ height: '200px', width: '100%' }} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {data?.map((value, i) => (
              <>
                <Col lg="3" className="mt-14">
                  <Row>
                    <Col lg="8"></Col>
                    <Col lg="4" md="4" sm="4" className="mt-1">
                      <Row>
                        <span className=" d-flex justify-content-right">
                          <div
                            target="_blank"
                            rel="noreferrer"
                            id="TooltipExample"
                            onClick={() => setActivecheck(value)}
                            onDoubleClick={() => setActivecheck(null)}
                            className="circle-bx"
                          >
                            <AiOutlineCheckCircle
                              fill={activecheck === value ? 'blue' : 'grey'}
                              size="23px"
                            />
                            <Tooltip
                              {...args}
                              isOpen={tooltipOpen}
                              target="TooltipExample"
                              toggle={toggle}
                            >
                              Sync Post
                            </Tooltip>
                          </div>
                        </span>
                      </Row>
                      <Row>
                        <span className=" d-flex justify-content-right mt-1">
                          <div
                            target="_blank"
                            rel="noreferre"
                            id="TooltipExamp"
                            onClick={() => setActive(value)}
                            onDoubleClick={() => setActive(null)}
                            className="circle-bx"
                          >
                            <Tooltip
                              {...args}
                              isOpen={tooltipOp}
                              target="TooltipExamp"
                              toggle={togglesecond}
                            >
                              Post Now
                            </Tooltip>
                            <BsFacebook fill={active === value ? 'blue' : 'grey'} size="22px" />
                          </div>
                        </span>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col sm={5} md={5} lg={5} className="mt-1">
                  <div className="post-main" key={value.id}>
                    <Card>
                      <CardBody>
                        <div className="post-box">
                          <Row>
                            <Col className=" d-flex justify-content-end">
                              <span className="">
                                <AiFillDelete
                                  onClick={() => handleDeletePost(value?._id)}
                                  fill="red"
                                  size="20px"
                                />
                              </span>
                            </Col>
                          </Row>
                          <div className="post-header ">
                            {value?.time === '' ? (
                              <>
                                {/* <Input
                                  size="sm"
                                  className="form-control customedatatime"
                                  placeholder="time placeholder"
                                  type="datetime-local"
                                  onChange={(e) => setDateTime(e.target.value)}
                                /> */}
                              </>
                            ) : null}
                            <div className="d-flex">
                              {value?.media_img?.length == 0 ? null : (
                                <>
                                  <img
                                    className="mb-1"
                                    alt="profile"
                                    src={value?.media_img[0]}
                                    style={{
                                      border: '1px solid',
                                      borderRadius: '50%',
                                      width: '50px',
                                      height: '50px'
                                    }}
                                  />
                                </>
                              )}

                              <h5 className="ml-2">
                                Lorem ipsum
                                <p className="font-s">
                                  <Moment format="DD/MM/YYYY">{value?.createdAt}</Moment>
                                </p>
                              </h5>
                            </div>

                            <p>{value?.desc}</p>
                          </div>
                          <div className="post-content">
                            <img
                              className="mb-1"
                              alt=""
                              src={value?.media_img[0]}
                              style={{
                                width: '100%'
                              }}
                            />
                            <div className=" comments">
                              <a
                                onClick={() => {
                                  setShowComment(true);
                                  getOneComment(value?._id, i);
                                }}
                                className="commenttext"
                              >
                                Comments
                              </a>
                            </div>
                            <Col key={value?._id}>
                              {ShowComment === true ? (
                                <>
                                  {comment !== '' && index == i ? (
                                    <>
                                      <div>
                                        <Card>
                                          <CardBody className="comment textbox">
                                            <div className="comment-box ">
                                              <div className="comt-list">
                                                <ul>
                                                  <div className="comt-form">
                                                    <h6>Comment:</h6>
                                                    <textarea
                                                      value={text}
                                                      onChange={(e) => setText(e.target.value)}
                                                      className="form-control"
                                                      placeholder="Comment...."
                                                    ></textarea>
                                                    <button
                                                      onClick={(e) => handlePost(e, value?._id)}
                                                      className="btn btn-primary mt-2 mr-2"
                                                    >
                                                      Post
                                                    </button>
                                                  </div>
                                                  {comment.map((data) => (
                                                    <li key={data?._id}>
                                                      <div className=" d-flex justify-content-end deletecoment">
                                                        <div className="deletecoment">
                                                          <AiFillDelete
                                                            onClick={() => handleDelete(data?._id)}
                                                            fill="red"
                                                            size="15px"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="d-flex">
                                                        <img
                                                          className="mb-1"
                                                          alt="profile"
                                                          src={Profile}
                                                          style={{
                                                            border: '1px solid',
                                                            borderRadius: '50%',
                                                            width: '30px',
                                                            height: '30px'
                                                          }}
                                                        />
                                                        <h5 className="mr-1">You</h5>
                                                        <p
                                                          className="ml-3"
                                                          style={{ fontSize: 12 }}
                                                        ></p>
                                                      </div>
                                                      <div className="commet-msg">
                                                        {data?.comment}
                                                      </div>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            </div>
                                          </CardBody>
                                        </Card>
                                      </div>
                                    </>
                                  ) : null}
                                </>
                              ) : null}
                            </Col>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
                <Col key={value?._id} sm={4} md={4} lg={4} className="mt-1"></Col>
              </>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};
export default FeedView;
