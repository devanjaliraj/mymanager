// ** React Imports
import { useParams } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

// ** Email App Component Imports
import Sidebar from './Sidebar';
import ComposePopUp from './ComposePopup';

// ** Third Party Components
import classnames from 'classnames';
import Select, { components } from 'react-select';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getMails, resetSelectedMail } from './store';
import { selectThemeColors } from '@utils';

import {
  GET_ALL_SECHEDULE_EMAIL,
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  UPDATE_EMAIL_CATEGORY,
  DELETE_MULTIPLE_TEMPLATE,
  GET_SENT_EMAILS,
  GET_ALL_SMART_LIST
} from './store/email';

import { connect } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-email.scss';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  Row
} from 'reactstrap';
import AddAutomationModal from './components/AddAutomationModal';
import AutomationGraph from './components/AutomationGraph';
import Content from './Content';
import { getSmartList } from './store/actions';

const GraphApp = (props) => {
  // ** States
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [subFolderActiveName, setSubFolderActiveName] = useState(null);
  const [subFolderActive, setSubFolderActive] = useState('6205c19ebd0fac9faf2163f5');
  const [editOrAddOrListTemplate, setEditOrAddOrListTemplate] = useState('list');
  const [viewTemplate, setViewTemplate] = useState(null);
  const [mailsTODisplay, setMailsTODisplay] = useState([]);
  const [showingAutomation, setShowingAutomation] = useState(null);
  const [automationName, setAutomationName] = useState('');
  const [selectSmartlistOptions, setSelectSmartlistOptions] = useState([]);
  const [smartlist, setSmartlist] = useState('');
  const [selectedSmartList, setSelectedSmartList] = useState('');
  const [isShowEditContactModal, setShowEditConatctModal] = useState(false);
  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);
  const toggleSidebar = () => setShowEditConatctModal(!isShowEditContactModal);

  const {
    categoriesEmail,
    allScheduleMails,
    allSentEmails,
    allTypeOfScheduleEmails,
    goBackToTable,
    automationData
  } = props;

  const MakeActionOnTemplate = () => {
    // setEditOrAddOrListTemplate('add');
    setOpen(!open);
  };
  const toggleModal = () => {
    setOpen(!open);
  };

  // ** Store Variables
  const dispatch = useDispatch();
  // ** Vars
  const params = useParams();
  const selectedAutomation = useSelector((state) => state.automation.selectedAutomation);
  
  const isNew = useSelector((state) => state.automation.isNew);
  const isEdit = useSelector((state) => state.automation.isEdit);
  
  const save = () => {
    if (isEdit) {
      dispatch(updateAutomation);
    }
  };
  

  useEffect(() => {
    dispatch(getSmartList());
    if (selectedAutomation != null) {
      setShowingAutomation(selectedAutomation);
      setAutomationName(selectedAutomation.automationName);.3
    }
  }, [selectedAutomation]);
  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(GET_SCHEDULE_MAILS('/email_nurturing', subFolderActive));
  }, [query, params.folder, params.label]);

  useEffect(() => {
    setMailsTODisplay(allScheduleMails?.data?.template);
  }, [allScheduleMails]);

  // useEffect(() => {
  //   (async () => {
  //     if (smartlistStore.smartLists.length > 0) {
  //       let selectSmartlistOptions = [];
  //       for (let folderData of smartlistStore.smartLists) {
  //         const { data } = await API.get(`/smartlistitem/get/${folderData._id}`);
  //         const items = data.data.map((item) => {
  //           return {
  //             label: item.title,
  //             value: item._id,
  //           };
  //         });
  //         selectSmartlistOptions.push({
  //           label: folderData.name,
  //           options: items
  //         });
  //       }
  //       setSelectSmartlistOptions(selectSmartlistOptions);
  //     }
  //   })();
  // }, [smartlistStore.smartLists]);

  const onSetSelectedSmartList = (e) => {
    setSelectedSmartList(e.value);
  };
  const onSetEditContact = () => {
    setShowEditConatctModal(true);
  };
  return (
    <>
      <Row className="m-1 pb-1 border-bottom">
        <Label style={{ fontWeight: 'bold' }}>AUTOMATION NAME</Label>
        <Col sm="5" lg="5" md="5">
          <Input
            type="text"
            theme={selectThemeColors}
            id="basicInput"
            placeholder="Enter Automation Name"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
          />
        </Col>

        <Col sm="3" lg="3" md="3"></Col>
        <Col sm="2" lg="2" md="2">
          <Button color="success" block outline onClick={() => save()}>
            Save
          </Button>
        </Col>
        <Col sm="2" lg="2" md="2">
          <Button color="primary" block outline onClick={() => goBackToTable()}>
            Go back
          </Button>
        </Col>
        <Col sm="1" lg="1" md="1"></Col>
      </Row>
      <Fragment>
   
        <div className="content-right w-100">
          <div className="content-body">
            <div style={{ display: 'flex', flex: 1 }}>
              <div
                style={{
                  background: '#f6f8fa',
                  width: '100%',
                  overflow: 'auto'
                }}
              >
                <Fragment>
                  <div style={{ overflow: 'auto' }}>
                    {showingAutomation != null ? (
                      <AutomationGraph
                        automationData={showingAutomation.schedules}
                        setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                        subFolderActive={subFolderActive}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </Fragment>
              </div>
            </div>
          </div>
        </div>

        <ComposePopUp composeOpen={composeOpen} toggleCompose={toggleCompose} />
      </Fragment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesEmail: state.EmailMarketing.categoriesEmail,
    allScheduleMails: state.EmailMarketing.allScheduleMails,
    allTypeOfScheduleEmails: state.EmailMarketing.allScheduleEmails, // get all type of schedule emails
    allSentEmails: state.EmailMarketing.allSentEmails
  };
};

export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  DELETE_MULTIPLE_TEMPLATE,
  UPDATE_EMAIL_CATEGORY,
  GET_SENT_EMAILS,
  GET_ALL_SECHEDULE_EMAIL,
  GET_ALL_SMART_LIST
})(GraphApp);
