import React, { useState, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import AutomationSequence from './AutomationSequence';
import { connect } from 'react-redux';
import { RotateCcw } from 'react-feather';
import {
  DELETE_CATEGORY_EMAIL,
  DELETE_MULTIPLE_TEMPLATE,
  DELETE_SUB_FOLDER_EMAIL,
  GET_ALL_SECHEDULE_EMAIL,
  GET_ALL_SMART_LIST,
  GET_CATEGORIES_EMAIL,
  GET_SCHEDULE_MAILS,
  GET_SENT_EMAILS,
  UPDATE_EMAIL_CATEGORY
} from '../store/email';

import { Button } from 'reactstrap';

const AutomationGraph = (props) => {
  const [currentPosition, setCurrentPosition] = useState({
    xRate: 0,
    yRate: 0
  });
  const onDrag = (e = DraggableEvent, data = DraggableData) => {
    setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
  };

  const [selectedId, setSelectedId] = useState([]);
  const [mailsTODisplay, setMailsTODisplay] = useState([]);
  const [viewTemplate, setViewTemplate] = useState(null);
  const [subFolderActiveName, setSubFolderActiveName] = useState(null);
  const { allScheduleMails, automationData } = props;
  const { setEditOrAddOrListTemplate, subFolderActive } = props;

  const handleselecteOne = (e, item) => {
    let { value } = e.target;
    if (selectedId?.includes(value)) {
      let IdAfterRemove = selectedId?.filter((id) => id !== value);
      setSelectedId(IdAfterRemove);
    } else {
      setSelectedId((preStuff) => [...preStuff, value]);
    }
  };

  const handleView = (template) => {
    setViewTemplate(template);
  };

  useEffect(() => {
    setMailsTODisplay(automationData);
  }, [automationData]);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isRotation, setIsRotation] = useState(false);
  const [rotation, setRotation] = useState(0);
  const handleZoomIn = () => {
    setZoomLevel((zoomLevel) => zoomLevel + 0.1);
  };
  const handleWheel = (event) => {
    event.preventDefault();
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // decrease zoom on scroll down, increase on scroll up
    setZoomLevel((zoomLevel) => zoomLevel * zoomFactor);
    // props.setZoomLevelManual(zoomLevel);
  };
  const handleZoomOut = () => {
    setZoomLevel((zoomLevel) => zoomLevel - 0.1);
  };
  const handleRotation = () => {
    setIsRotation(!isRotation);
    setRotation(isRotation ? 0 : -90);
  };
 
  return (
    <div className="container overflow-hidden position-relative">
      <div style={{ position: 'absolute', left: '20px', top: '20px', textAlign: 'center' }}>
        <label className="text-uppercase">Actions</label>
        <div
          style={{
            border: '1px solid #1300ff',
            borderRadius: '50%',
            width: '60px',
            height: '60px'
          }}
        >
          <p style={{ fontSize: '24px', padding: '19px 0' }} className="font-weight-bold">
            {mailsTODisplay ? mailsTODisplay.length : 0}
          </p>
        </div>
        <div className="d-flex justify-center gaps border-1 mt-1">
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              cursor: 'pointer'
            }}
            onClick={handleZoomIn}
          >
            <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
              +
            </p>
          </div>
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              marginLeft: '3px',
              cursor: 'pointer'
            }}
            onClick={handleZoomOut}
          >
            <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
              -
            </p>
          </div>
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              marginLeft: '3px',
              cursor: 'pointer'
            }}
            onClick={handleRotation}
          >
            <p style={{ fontSize: '14px', textAlign: 'center' }} className="font-weight-bold">
              <RotateCcw size={13} style={{ marginBottom: '5px' }} />
            </p>
          </div>
        </div>
      </div>
      <Draggable
        position={{
          x: currentPosition.xRate,
          y: currentPosition.yRate
        }}
        onDrag={onDrag}
        cancel="strong"
      >
        <div
          className="w-80 cursor-move d-flex"
          style={{
            minHeight: '55vh',
            height: 'fit-content',
            marginLeft: '25%',
            alignItems: 'center',
            WebkitUserSelect: "none", /* Chrome/Safari */
            MozUserSelect: "none", /* Firefox */
            msUserSelect: "none", /* Internet Explorer/Edge */
            userSelect: "none",

          }}
          onWheel={handleWheel}
        >
          <div
            style={{ width: 'fit-content', marginLeft: '20%', height: 'fit-content !important' }}
            className="d-flex"
          >
            {mailsTODisplay ? (
              <AutomationSequence
                subFolderActive={subFolderActive}
                handleselecteOne={handleselecteOne}
                selectedId={selectedId}
                handleView={handleView}
                subFolderActiveName={subFolderActiveName || ''}
                setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                elements={mailsTODisplay}
                zoomLevel={zoomLevel}
                rotation={rotation}
                isRotation={isRotation}
                setZoomLevelManual={setZoomLevel}
              />
            ) : (
              <AutomationSequence
                subFolderActive={subFolderActive}
                handleselecteOne={handleselecteOne}
                selectedId={selectedId}
                handleView={handleView}
                subFolderActiveName={subFolderActiveName || ''}
                setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                elements={[]}
                zoomLevel={zoomLevel}
                rotation={rotation}
                isRotation={isRotation}
                setZoomLevelManual={setZoomLevel}
              />
            )}
          </div>
        </div>
      </Draggable>
    </div>
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
})(AutomationGraph);
