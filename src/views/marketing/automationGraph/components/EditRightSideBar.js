import React, { useState, useEffect } from 'react';
import Sidebar from '@components/sidebar';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  Input,
  ModalBody,
  Card,
  CardBody,
  Label,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Select, { components } from 'react-select';
import { selectThemeColors } from '../../../../utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
// import AddAutomationModal from './AddAutomationModal';
import { GrAddCircle } from 'react-icons/gr';
import { Plus } from 'react-feather';

// import { ChevronDown, ChevronUp } from 'react-feather';

const EditRightSideBar = ({ open, toggleSidebar, showData }) => {
  // ** States

  // const automation = useSelector((state) => state.automation);
  // const addNewType = automation.addNewType;
  // const selectedAutomation = automation.selectedAutomation;
  console.log('this is edit showing data', showData);
  const [activateTime, setActivateTime] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(null);
  const [template, setTemplate] = useState(null);
  const contactTypes = [
    { value: 'ContactType', label: 'ContactType' },
    { value: 'SmartList', label: 'SmartList' }
  ];

  const dateOptions = [
    { value: 'Immediately', label: 'Immediately' },
    { value: '10mins', label: '10mins' },
    { value: '30mins', label: '30mins' },
    { value: '1hour', label: '1hour' },
    { value: '6hour', label: '6hour' },
    { value: '12hour', label: '12hour' },
    { value: '1day', label: '1day' },
    { value: '2days', label: '2days' }
  ];
  const onSetContactType = (e) => {
    setContactType(e.value);
  };
  const onSetActivateTime = (e) => {
    setActivateTime(e.value);
  };
  const onSetSubject = (e) => {
    setSubject(e.target.value);
  };
  const onSetMessage = (data) => {
    // console.log(data);
    setMessage(data);

    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    const newtemplate = draftToHtml(convertToRaw(data.getCurrentContent()));
    setTemplate(newtemplate);
  };
  const handleSidebarClosed = () => {
    //
  };

  return (
    <Sidebar
      size="sm"
      open={open}
      // title={`Edit ${showData.content_type}`}
      title="Edit"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Card className="post">
        <CardBody>
          <Row>
            <Col className="mb-1" sm="12">
              <Label className="form-label">Activate Time</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={activateTime}
                options={dateOptions}
                isClearable={false}
                onChange={(e) => onSetActivateTime(e)}
              />
            </Col>
            {showData.type == 'email' && (
              <div className="compose-mail-form-field">
                <Label for="subject" className="form-label">
                  Subject:
                </Label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => onSetSubject(e)}
                />
              </div>
            )}

            {showData.type == 'email' && (
              <div id="message-editor">
                <Editor
                  placeholder="Message"
                  toolbarClassName="rounded-0"
                  wrapperClassName="toolbar-bottom"
                  editorClassName="rounded-0 border-0"
                  toolbar={{
                    options: ['inline', 'textAlign'],
                    inline: {
                      inDropdown: false,
                      options: ['bold', 'italic', 'underline', 'strikethrough']
                    }
                  }}
                  onEditorStateChange={(data) => onSetMessage(data)}
                  editorState={message}
                />
              </div>
            )}
            {showData.type == 'notification' && (
              <div id="message-editor">
                <Label>NOTIFICATION NOTE</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="new_notification"
                  rows="7"
                  placeholder="Type notification please."
                />
              </div>
            )}
            {showData.type == 'text' && (
              <div id="message-editor">
                <Label>CONTENT</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="new_text"
                  rows="7"
                  placeholder="Please type in sms content."
                />
              </div>
            )}
            {showData.type == 'automation' && (
              <div className="compose-mail-form-field">
                <Label for="subject" className="form-label">
                  SELECT AUTOMATION
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  // defaultValue={activateTime}
                  // options={dateOptions}
                  placeholder="Search automation"
                  isClearable={false}
                  // onChange={(e) => onSetActivateTime(e)}
                />
              </div>
            )}
          </Row>
          <Row className="mt-2">
            <Col sm="6" lg="6" md="6">
              <Button color="primary" block outline onClick={() => toggleSidebar()}>
                Cancel
              </Button>
            </Col>
            <Col sm="6" lg="6" md="6">
              <Button color="success" block outline onClick={() => toggleSidebar()}>
                Update
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Sidebar>
  );
};

export default EditRightSideBar;
