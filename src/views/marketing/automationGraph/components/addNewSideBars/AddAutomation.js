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
import { selectThemeColors } from '../../../../../utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
// import AddAutomationModal from './AddAutomationModal';
import { GrAddCircle } from 'react-icons/gr';
import { Plus } from 'react-feather';

import { addNewAction } from '../../store/actions';

const AddAutomation = ({ open, toggleSidebar }) => {
  const handleSidebarClosed = () => {
    //
  };

  const automation = useSelector((state) => state.automation);
  const addNewType = automation.addNewType;
  const selectedAutomation = automation.selectedAutomation;

  const [contactType, setContactType] = useState(null);
  const [activateTime, setActivateTime] = useState('null');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');
  const [currentAutomation, setCurrentAutomation] = useState(selectedAutomation);

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
    setMessage(data);

    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    const newtemplate = draftToHtml(convertToRaw(data.getCurrentContent()));
    setTemplate(newtemplate);
  };
  const dispatch = useDispatch();
  const onInsert = () => {
    const insertData = {
      id: uuidv4(),
      type: 'automation',
      startDate: activateTime,
      contactType: contactType,
      template: template,
      contacts: [],
      tags: [],
      subject: subject
    };
    const indexInfo = addNewType;
    let updatedata = currentAutomation;
    let updatedObject;
    if (indexInfo.order == 'before') {
      const newSchedules = [
        ...updatedata.schedules.slice(0, indexInfo.index),
        insertData,
        ...updatedata.schedules.slice(indexInfo.index)
      ];

      // create a new object with the updated schedules array:
      updatedObject = { ...updatedata, schedules: newSchedules };
    } else {
      const newSchedules = [
        ...updatedata.schedules.slice(0, indexInfo.index + 1),
        insertData,
        ...updatedata.schedules.slice(indexInfo.index + 1)
      ];

      // create a new object with the updated schedules array:
      updatedObject = { ...updatedata, schedules: newSchedules };
    }

    dispatch(addNewAction(updatedObject));

    toggleSidebar();
  };
  return (
    <Sidebar
      size="sm"
      open={open}
      // title={`Edit ${showData.content_type}`}
      title="New Automation"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Card className="post">
        <CardBody>
          <Row>
            <Col className="mb-1" sm="12">
              <Label className="form-label">TIME DELAY </Label>
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
          </Row>

          <Row className="mt-2">
            <Col sm="6" lg="6" md="6">
              <Button color="primary" block outline onClick={() => toggleSidebar()}>
                Cancel
              </Button>
            </Col>
            <Col sm="6" lg="6" md="6">
              <Button color="success" block outline onClick={() => onInsert()}>
                Insert
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Sidebar>
  );
};

export default AddAutomation;
