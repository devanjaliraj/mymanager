import React, { Fragment, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import GridView from './GridView';
import FeedView from './FeedView';
import CalendarView from './CalendarView';
import { Edit2 } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import Insta from '../../../../assets/images/logo/insta.png';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import Profile from '../../../../assets/images/profile/post-media/2.jpg';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { toast } from 'react-toastify';
import CreateWorkspace from './CreateWorkspace';
import { addCompose } from '../../../../requests/Planable';
import '../../../../assets/styles/socialconnect.scss';

const WorkspaceMain = ({ workspacename }) => {
  const workspacetitle = workspacename;
  const [basicModal, setBasicModal] = useState(false);
  const [active, setActive] = useState('today');
  const [viewType, setViewType] = useState('Feed View');
  const [textarea, setTextarea] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [Url, setUrl] = useState('');
  const [file, setFile] = useState();
  const [social, setSocial] = useState();

  const handleSelectSocial = (select) => {
    const socialconnect = select.map((data) => data.label);
    const data = socialconnect;
    setSocial(data);
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('url', Url);
    formdata.append('desc', textarea);
    formdata.append('date', date);
    formdata.append('time', time);
    formdata.append('platform', social);

    await addCompose(formdata).then((response) => {
      console.log(response);
      if (response.msg == 'Compose created successfully') {
        toast.success('Composed Created Successfully');
        setTextarea('');
        setTime('');
        setDate('');
        setUrl('');
        setFile('');
        setSocial('');
      } else {
        setTextarea('');
        setTime('');
        setDate('');
        setUrl('');
        setFile('');
        setSocial('');
      }
    });
  };
  const toggle = (tab) => {
    setActive(tab);
  };
  const handleViewType = (e) => {
    setViewType(e.target.value);
  };

  const colourOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Google', label: 'Google' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Linkdin', label: 'Linkdin' },
    { value: 'Instagram', label: 'Instagram' }
  ];

  return (
    <Fragment>
      <Card className="p-1">
        <Row>
          <Col sm={2} md={2} lg={2}>
            <Input type="select" onChange={handleViewType} value={viewType}>
              <option value="Grid View">Grid View</option>
              <option value="Feed View">Feed View</option>
              <option value="Calendar View">Calendar View</option>
            </Input>
          </Col>
          <Col sm={8} md={8} lg={8}>
            <Nav className="justify-content-center mb-0" tabs>
              <NavItem>
                <NavLink
                  active={active === 'today'}
                  onClick={() => {
                    toggle('today');
                  }}
                >
                  <div>
                    <FaFacebookSquare size={28} />

                    <h6 style={{ color: 'black' }}>{workspacetitle?.slice(0, 4)}</h6>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'completed'}
                  onClick={() => {
                    toggle('completed');
                  }}
                >
                  <div>
                    <FcGoogle size={28} />
                    <h6 style={{ color: 'black' }}>{workspacetitle?.slice(0, 4)}</h6>
                  </div>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={active === 'test-1'}
                  onClick={() => {
                    toggle('test-1');
                  }}
                >
                  <div>
                    <FaTwitterSquare size={28} fill="#00acee" />
                    <h6 style={{ color: 'black' }}>{workspacetitle?.slice(0, 4)}</h6>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'test-2'}
                  onClick={() => {
                    toggle('test-2');
                  }}
                >
                  <div>
                    <BsLinkedin size={28} fill="#0A66C2" />
                    <h6 style={{ color: 'black' }}>{workspacetitle?.slice(0, 4)}</h6>
                  </div>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={active === 'test-3'}
                  onClick={() => {
                    toggle('test-3');
                  }}
                >
                  <div>
                    <img src={Insta} alt="insta" width={28} />
                    <h6 style={{ color: 'black' }}>{workspacetitle?.slice(0, 4)}</h6>
                  </div>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={active === 'test-4'}
                  onClick={() => {
                    toggle('test-4');
                  }}
                >
                  <div>
                    <FaYoutube size={28} fill="#c4302b" />
                    <h6 style={{ color: 'black' }}>{workspacetitle?.slice(0, 4)}</h6>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'test-5'}
                  onClick={() => {
                    toggle('test-5');
                  }}
                >
                  <div>
                    <FaTiktok size={28} fill="#EE1D52" />
                    <h6 style={{ color: 'black' }}>{workspacetitle?.slice(0, 4)}</h6>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'test-6'}
                  onClick={() => {
                    toggle('test-6');
                  }}
                >
                  <div>
                    <AiOutlinePlusSquare size={30} fill="blue" />
                    <h6 style={{ color: 'black' }} className="addworksp">
                      Add Wor..
                    </h6>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={2} md={2} lg={2} className="d-flex justify-content-end">
            <div className="composebutton">
              <Button
                color="success"
                onClick={() => setBasicModal(!basicModal)}
                className="composebtn"
              >
                <Edit2 size={18} className="me-1" />
                Compose
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="today">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>

        <TabPane tabId="completed">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-1">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-2">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-3">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-4">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-5">
          {viewType === 'Grid View' ? (
            <GridView />
          ) : viewType === 'Feed View' ? (
            <FeedView />
          ) : (
            <CalendarView />
          )}
        </TabPane>
        <TabPane tabId="test-6">
          <CreateWorkspace />
        </TabPane>
      </TabContent>

      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>Compose your post</ModalHeader>
          <ModalBody>
            <div className="compose-content">
              <form>
                <Row>
                  <Col md="3">
                    <div className="text-center">
                      <img
                        className="mb-1 mt-1"
                        alt="profile"
                        src={Profile}
                        style={{
                          border: '1px solid',
                          borderRadius: '4%',
                          width: '50px',
                          height: '50px'
                        }}
                      />
                    </div>
                  </Col>
                  <Col md="9">
                    <h5>Select Social Media to Upload Post</h5>
                    <Select
                      onChange={handleSelectSocial}
                      theme={selectThemeColors}
                      isMulti
                      className="react-select"
                      classNamePrefix="select"
                      defaultValue={colourOptions[0]}
                      options={colourOptions}
                      isClearable={false}
                    />
                  </Col>
                  <Col md="12" className="mt-1">
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      value={textarea}
                      rows="3"
                      placeholder="write something..."
                      onChange={(e) => setTextarea(e.target.value)}
                    />
                  </Col>
                  <Col md="12" className="mt-1">
                    <label className="">Select Time and Date</label>
                    <Row>
                      <Col md="6">
                        <Input
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          type="time"
                          name=""
                        />
                      </Col>
                      <Col md="6">
                        <Input onChange={(e) => setDate(e.target.value)} type="date" name="" />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6" className="mt-1">
                    <label className="">Add Url</label>
                    <Input
                      value={Url}
                      onChange={(e) => setUrl(e.target.value)}
                      type="text"
                      placeholder="www.dummy.com"
                    />
                  </Col>
                  <Col md="6" className="mt-1">
                    <label className="">Add File</label>
                    <Input onChange={(e) => setFile(e.target.files[0])} type="file" />
                  </Col>
                </Row>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                setBasicModal(!basicModal);
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};
export default WorkspaceMain;
