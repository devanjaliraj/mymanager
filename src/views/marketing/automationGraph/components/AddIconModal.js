import React, { useState } from 'react';
import Sidebar from '@components/sidebar';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Card, CardBody, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
// import AddAutomationModal from './AddAutomationModal';
import { GrAddCircle } from 'react-icons/gr';
import { Plus } from 'react-feather';
import AddNotification from './addNewSideBars/AddNotification';
import AddText from './addNewSideBars/AddText';
import AddEmail from './addNewSideBars/AddEmail';
import AddAutomation from './addNewSideBars/AddAutomation';
import sendEmailSvg from '../../../../assets/images/svg/send_email.svg';
import sendTextSvg from '../../../../assets/images/svg/send_text.svg';
import automationSvg from '../../../../assets/images/svg/automation.svg';
import followUpSvg from '../../../../assets/images/svg/follow_up.svg';
import { setAddNewTypeAndIndex } from '../store/actions';

const AddIconModal = (props) => {
  const [open, setOpen] = useState(false);
  // const classes = useStyles()
  const [openNewNotification, setOpenNewNotification] = useState(false);
  const [openNewText, setOpenNewText] = useState(false);
  const [openNewEmail, setOpenNewEmail] = useState(false);
  const [openNewAutomation, setOpenNewAutomation] = useState(false);

  const selectedAutomation = useSelector(state => state.automation.contactInfo)

  const dispatch = useDispatch();
  const toggleModal = () => {
    setOpen(!open);
  };
  const handleSidebarClosed = () => {
    //
  };
  const onShowAddNewNotification = () => {
    const actiondata = {
      type: 'notification',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewNotification(true);
  };
  const onShowAddNewText = () => {
    const actiondata = {
      type: 'text',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewText(true);
  };
  const onShowAddNewEmail = () => {
    const actiondata = {
      type: 'email',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewEmail(true);
  };
  const onShowAddNewAutomation = () => {
    const actiondata = {
      type: 'automation',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewAutomation(true);
  };

  const toggleNotificationBar = () => setOpenNewNotification(!openNewNotification);
  const toggleTextBar = () => setOpenNewText(!openNewText);
  const toggleEmailBar = () => setOpenNewEmail(!openNewEmail);
  const toggleAutomationBar = () => setOpenNewAutomation(!openNewAutomation);

  return (
    <div>
      <div width="20" height="20" className="d-flex justify-content-center align-items-center">
        <Plus
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      <Sidebar
        size="lg"
        open={open}
        // title={`Edit ${showData.content_type}`}
        title="Add New Action"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={toggleModal}
        onClosed={handleSidebarClosed}
      >
        <Card className="post">
          <CardBody onClick={() => onShowAddNewNotification()}>
            <Row>
              <Col sm="2" md="2" xl="2">
                <img src={followUpSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Notification
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Create a new notification for an action
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="post">
          <CardBody onClick={onShowAddNewText}>
            <Row>
              <Col sm="2" md="2" xl="2">
                <img src={sendTextSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Text
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Add a new text to the automation flow
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="post">
          <CardBody onClick={onShowAddNewEmail}>
            <Row>
              <Col sm="2" md="2" xl="2">
                <img src={sendEmailSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Email
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Add a new email to the automation flow
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="post">
          <CardBody onClick={onShowAddNewAutomation}>
            <Row>
              <Col sm="2" md="2" xl="2">
                <img src={automationSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Automation
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Add an existing automation to the campaign
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Sidebar>
      {openNewNotification && 
        <AddNotification open={openNewNotification} toggleSidebar={toggleNotificationBar} />
      }
      {openNewText && <AddText open={openNewText} toggleSidebar={toggleTextBar} />}
      {openNewEmail && <AddEmail open={openNewEmail} toggleSidebar={toggleEmailBar} />}
      {openNewAutomation && (
        <AddAutomation open={openNewAutomation} toggleSidebar={toggleAutomationBar} />
      )}
    </div>
  );
};

export default AddIconModal;
