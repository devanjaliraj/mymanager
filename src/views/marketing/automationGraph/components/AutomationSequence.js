import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
  SWAP_TEMPLATE,
  MAKE_TEMPLATE_AS_ACTIVATE,
  GET_CATEGORIES_EMAIL
} from '../store/email';
import { connect } from 'react-redux';

import AddIconModal from './AddIconModal';
import { AutomationIcon } from './AutomationIcon';
import EditRightSideBar from './EditRightSideBar';
import AddEventRightSideBar from './AddEventRightSideBar';
import contactConditionSvg from '../../../../assets/images/svg/contact_condition.svg';
import EditContactSideBar from './EditContactSideBar';

const getListStyle = (isDraggingOver) => ({
  // padding: grid,
  // width: 250
});

const AutomationSequence = (props) => {
  // console.log('this is sidebar info', props);

  const userId = localStorage.getItem('user_id');
  const { SWAP_TEMPLATE, GET_CATEGORIES_EMAIL } = props;
  const { elements, setEditOrAddOrListTemplate, subFolderActive } = props;
  const [items, setItems] = useState([]);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [isShowEditModal, setShowEditModal] = useState(false);
  const [showData, setShowData] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isShowEditContactModal, setShowEditConatctModal] = useState(false);
  const toggleEditContactSideBar = () => setShowEditConatctModal(!isShowEditContactModal);

  const rotation = props.rotation;
  const isRotation = props.isRotation;

  const toggleSidebar = () => setShowEditModal(!isShowEditModal);
  const toggleAddSidebar = () => setShowAddNewModal(!showAddNewModal);

  const onDragEnd = (result) => {
    if (result && result.source && result.destination) {
      const newItems = Array.from(items);
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setItems(newItems);
      let startedFrom = elements[result?.source.index];
      let destination = elements[result?.destination.index];
      let payload = {
        newPositionOfFirstSelected: result?.destination.index,
        FirstSelectedOid: startedFrom._id,
        DateOfFirstSelectedOid: startedFrom?.sent_date,

        newPositionOfSecondSelected: result?.source.index,
        SecondSelectedOid: destination._id,
        DateOfSecondSelectedOid: destination?.sent_date
      };
      SWAP_TEMPLATE(startedFrom.folderId, payload);
      setTimeout(() => {
        GET_CATEGORIES_EMAIL('/email_nurturing');
      }, 300);
    }
  };

  const handleActivateChange = (item) => {
    let payload = {
      tempId: [item?._id],
      isActive: item?.inActiveUsers.includes(userId)
    };
    MAKE_TEMPLATE_AS_ACTIVATE('/email_nurturing', payload, item?.folderId);
    if (item?._id) {
    }
  };

  const getSmartList = (smartlist) => {
    let smartlistName = [];
    for (let folder of props?.getAllSmartList) {
      for (let item of folder?.smartlists) {
        if (smartlist?.includes(item?._id)) {
          smartlistName.push(item);
        }
      }
    }
    return smartlistName;
  };

  useEffect(() => {
    setItems(elements);
    setZoomLevel(props.zoomLevel);
  }, [elements, props.zoomLevel]);
  const showEditRightSideBar = (EditData) => {
    setShowData(EditData);
    setShowEditModal(true);
  };
  const showAddNewEvent = () => {
    setShowAddNewModal(true);
  };
  const onSetEditContactSideBar = () => {
    setShowEditConatctModal(true);
  };
  const handleWheel = (event) => {
    event.preventDefault();
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // decrease zoom on scroll down, increase on scroll up
    setZoomLevel((zoomLevel) => zoomLevel * zoomFactor);
    props.setZoomLevelManual(zoomLevel);
  };
  const rotationStyle = {
    transform: `rotate(${rotation}deg)`
  };
  const rotationAddIcon = isRotation ? '21px' : '21px';
  const rotationIconStyle = {
    transform: `rotate(${-rotation}deg)`
  };
  const rotationStartStyle = isRotation ? { marginBottom: '20px' } : { marginBottom: '0px' };
  const automationIconStyle = isRotation
    ? { width: '110px', height: '110px' }
    : { width: '150px', height: '110px' };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    marginTop: isRotation ? '57px' : '65px',

    // styles we need to apply on draggables
    ...draggableStyle
  });
  return (
    <div style={rotationStyle} >
      <div style={{ transform: `scale(${zoomLevel})` }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <div style={{ marginLeft: '50px', cursor: 'pointer' }}>
                  <strong>
                    <img
                      src={contactConditionSvg}
                      alt="email"
                      height="45"
                      width="45"
                      style={rotationStartStyle}
                      onClick={() => onSetEditContactSideBar()}
                    />
                  </strong>
                </div>
                {/* <div className="w-100 text-center" style={{ backgroundColor: 'transparent' }}>
                  <label
                    className="font-weight-bold text-center"
                    style={{ fontSize: '14px', color: 'red' }}
                  >
                    START
                  </label>
                </div> */}

                {items.length == 0 && (
                  <Draggable Draggable draggableId={0} index={0} key={0}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="position-relative"
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="position-relative "
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: '42px',
                              top: '-20px',
                              width: '150px'
                            }}
                          >
                            {isRotation ? (
                              <div
                                className="automation-add-line"
                                style={{
                                  fill: 'none',
                                  stroke: '#666',
                                  webkitUserSelect: 'none',
                                  userSelect: 'none',
                                  width: '90px',
                                  marginLeft: '-11px'
                                }}
                              ></div>
                            ) : (
                              <div
                                className="automation-add-line"
                                style={{
                                  fill: 'none',
                                  stroke: '#666',
                                  webkitUserSelect: 'none',
                                  userSelect: 'none'
                                }}
                              ></div>
                            )}
                            <div
                              className="automationAddIcon"
                              // onClick={showAddNewEvent}
                              style={{
                                width: '24px',
                                border: '1px solid #666',
                                height: '25px',
                                borderRadius: '50%',
                                position: 'absolute',
                                left: `${rotationAddIcon}`,
                                top: '-7px',
                                background: 'white'
                              }}
                            ><strong>
                                <AddIconModal
                                  order="after"
                                  setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                  subFolderActive={subFolderActive}
                                />
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )}
                {items.map((item, index) => {
                  return (
                    <Draggable Draggable draggableId={item?._id} index={index} key={item?._id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="position-relative"
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <div style={{ position: 'absolute', left: '42px', top: '-20px' }}>
                            {isRotation ? (
                              <div
                                className="automation-add-line"
                                style={{
                                  fill: 'none',
                                  stroke: '#666',
                                  webkitUserSelect: 'none',
                                  userSelect: 'none',
                                  width: '90px',
                                  marginLeft: '-11px'
                                }}
                              ></div>
                            ) : (
                              <div
                                className="automation-add-line"
                                style={{
                                  fill: 'none',
                                  stroke: '#666',
                                  webkitUserSelect: 'none',
                                  userSelect: 'none'
                                }}
                              ></div>
                            )}
                            <div
                              className="automationAddIcon"
                              style={{
                                width: '24px',
                                border: '1px solid #666',
                                height: '25px',
                                borderRadius: '50%',
                                position: 'absolute',
                                left: `${rotationAddIcon}`,
                                top: '-7px',
                                background: 'white'
                              }}
                            >
                              <strong>
                                <AddIconModal
                                  order="before"
                                  item={item}
                                  index={index}
                                  setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                  subFolderActive={subFolderActive}
                                />
                              </strong>
                            </div>
                          </div>
                          <div className="automationAdd" style={automationIconStyle}>
                            <AutomationIcon
                              item={item}
                              showSide={showEditRightSideBar}
                              index={index}
                              rotationIconStyle={rotationIconStyle}
                            />

                            {/*<div className="w-100 p-1 mt-1 text-center">*/}
                            {/*  <img src={sendEmailSvg} alt="email" height="45" width="45" style={{marginTop: "5px"}}/>*/}
                            {/*</div>*/}
                            {/*<div className="w-100 text-center" style={{backgroundColor: "transparent"}}>*/}
                            {/*  <label className="font-weight-bold" style={{fontSize: "14px", margin: 0}}>New Email</label>*/}
                            {/*  <label className={classes.automationTime}>*/}
                            {/*    {index === 0 ? (*/}
                            {/*      <>Send immediately</>*/}
                            {/*    ) : item?.days ? (*/}
                            {/*      <>*/}
                            {/*        Send {item?.days} days{" "}*/}
                            {/*        {item?.days_type || "after"} <br /> the*/}
                            {/*        previus message*/}
                            {/*      </>*/}
                            {/*    ) : (*/}
                            {/*      <>*/}
                            {/*        Send at{" "}*/}
                            {/*        {moment(item.sent_date).format(*/}
                            {/*          "MMM DD, YYYY"*/}
                            {/*        )}*/}
                            {/*      </>*/}
                            {/*    )}*/}
                            {/*  </label>*/}
                            {/*</div>*/}
                          </div>

                          {index === items.length - 1 && (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="position-relative"
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div style={{ position: 'absolute', left: '42px', top: '-20px' }}>
                                {isRotation ? (
                                  <div
                                    className="automation-add-line"
                                    style={{
                                      fill: 'none',
                                      stroke: '#666',
                                      webkitUserSelect: 'none',
                                      userSelect: 'none',
                                      width: '90px',
                                      marginLeft: '-11px'
                                    }}
                                  ></div>
                                ) : (
                                  <div
                                    className="automation-add-line"
                                    style={{
                                      fill: 'none',
                                      stroke: '#666',
                                      webkitUserSelect: 'none',
                                      userSelect: 'none'
                                    }}
                                  ></div>
                                )}
                                <div
                                  className="automationAddIcon"
                                  // onClick={showAddNewEvent}
                                  style={{
                                    width: '24px',
                                    border: '1px solid #666',
                                    height: '25px',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    left: `${rotationAddIcon}`,
                                    top: '-7px',
                                    background: 'white'
                                  }}
                                >
                                  <strong>
                                    <AddIconModal
                                      order="after"
                                      item={item}
                                      index={index}
                                      setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                      subFolderActive={subFolderActive}
                                    />
                                  </strong>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isShowEditModal && (
        <EditRightSideBar
          showData={showData}
          open={isShowEditModal}
          toggleSidebar={toggleSidebar}
        />
      )}
      {showAddNewModal && (
        <AddEventRightSideBar open={showAddNewModal} toggleSidebar={toggleAddSidebar} />
      )}
      {isShowEditContactModal && (
        <EditContactSideBar
          open={isShowEditContactModal}
          toggleSidebar={toggleEditContactSideBar}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList
  };
};
export default connect(mapStateToProps, {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
  SWAP_TEMPLATE,
  MAKE_TEMPLATE_AS_ACTIVATE,
  GET_CATEGORIES_EMAIL
})(AutomationSequence);
