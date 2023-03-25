import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Trash } from 'react-feather';
import Retention from './tabs/retention';
import axios from 'axios';
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import { FiSettings } from 'react-icons/fi';
const Sidebar = (props) => {
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState(0);
  const [postData, setPostData] = useState([]);
  const [modalnewsmartlist, setModalnewsmartlist] = useState(false);
  const [fbDataResponse, setData] = useState([]);
  console.log(fbDataResponse);
  const togglemodalnewsmartlist = () => setModalnewsmartlist(!modalnewsmartlist);
  let facebookResponseValue = localStorage.getItem('accessToken');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
      if (facebookResponseValue) {
        axios
          .get(
            `https://graph.facebook.com/${tab}/posts?access_token=${facebookResponseValue}&fields=id,message,created_time,picture`
          )
          .then((resp) => {
            if (resp?.data?.data?.length) {
              setPostData(resp?.data?.data);
            }
          })
          .catch((error) => {
            // console.log('Error', error);
          });
      }
    }
  };

  useEffect(() => {
    if (facebookResponseValue) {
      axios
        .get(
          `https://graph.facebook.com/me/accounts?fields=access_token,id,name,picture{url}&access_token=${facebookResponseValue}`
        )
        .then((resp) => {
          if (resp?.data?.data?.length) {
            setActive(resp?.data?.data[0].id);
          }
          setData(resp?.data?.data);
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  }, []);

  return (
    <>
      <Modal centered={true} isOpen={modalnewsmartlist} toggle={togglemodalnewsmartlist} size="md">
        <ModalHeader toggle={togglemodalnewsmartlist}> Client Check In</ModalHeader>
        <ModalBody className="p-2">
          <FormGroup row>
            <Label for="Smartlistname" sm={12}>
              customer Name
            </Label>
            <Col sm={12}>
              <Input
                id="smartlistfolder"
                name=" Smartlistname"
                placeholder="Custmer Name"
                type="text"
                // size = '38'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Smartlistname" sm={12}>
              customer Email or Phone
            </Label>
            <Col sm={12}>
              <Input
                id="smartlistfolder"
                name=" Smartlistname"
                placeholder="Email or Phone"
                type="text"
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="btn btn-outline-danger" onClick={togglemodalnewsmartlist}>
            Cancel
          </Button>
          {'  '}
          <Button color="btn btn-primary" onClick={togglemodalnewsmartlist}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div className="form-group-compose text-center compose-btn">
                <Link to="/add-new" className="text-light">
                  <Button className="compose-email" color="primary" block>
                    Add Facebook Account
                  </Button>
                </Link>
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages">
                  {fbDataResponse.length > 0 ? (
                    fbDataResponse.map((ele, i) => {
                      return (
                        <ListGroupItem
                          tag={NavLink}
                          onClick={() => toggleTab(ele?.id)}
                          active={active === ele?.id}
                          action
                          className="mt-1"
                        >
                          <img
                            alt="images"
                            style={{ width: '40px', borderRadius: '12px' }}
                            src={ele?.picture.data.url}
                          />
                          <span className="align-middle" style={{ marginLeft: '10px' }}>
                            {ele?.name.slice(0, 15)}...
                          </span>
                          <Trash className="float-end" style={{ marginTop: '10px' }} size={18} />
                        </ListGroupItem>
                      );
                    })
                  ) : (
                    <div className="text-center mt-5">
                      <b>Need to login Facebook account</b>
                    </div>
                  )}
                </ListGroup>
                <hr className="mt-5" />

                <ListGroup tag="div" className="list-group-messages  mt-2">
                  <ListGroupItem>
                    <span className="align-middle">Settings</span>
                    <Link to="/reputation/settings">
                      <FiSettings className="float-end  " size={18} />
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>

      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>

            <PerfectScrollbar>
              <TabContent activeTab={active}>
                {fbDataResponse.length > 0 ? (
                  fbDataResponse.map((element, i) => {
                    return (
                      <TabPane tabId={element?.id}>
                        <Retention
                          groupNumber={element?.name}
                          groupImage={element?.picture.data.url}
                          postData={postData.length > 0 ? postData : []}
                          pageAccessToken={element?.access_token}
                        />
                      </TabPane>
                    );
                  })
                ) : (
                  <h2 className="text-center mt-5">
                    <b>No Data Found</b>
                  </h2>
                )}
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
