// ** React Imports
import React, { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import {
  ArrowRightCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  MessageSquare,
  Share,
  UserPlus
} from 'react-feather'
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
import { Code } from 'react-feather';
import { CiCircleList } from 'react-icons/ci';
import { Button, Col, Collapse, Row } from 'reactstrap';

// ** User Components
// Todo: move tab folders to tabs folder
import { useRTL } from '@hooks/useRTL';
import SidebarLeft from './SidebarLeft'
import EventCalendar from './Calendar'
import AttendanceCalendar from './attendance/Calender'
import AddEventSidebar from './event/AddEventSidebar'
import AddClass from './attendance/AddClass'
import BookTable from './book/list/bookTable'
import BookingType from './book/booking-type/index'
import BookingSideLeft from './book/SidebarLeft'
import EventManager from './event'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import '@styles/react/apps/app-calendar.scss';
import '@styles/react/apps/app-email.scss';
import classnames from 'classnames'


import {
  selectEvent,
  updateEvent,
  updateFilter,
  updateAllFilters,
  addEvent,
  removeEvent
} from './store';

// ** CalendarColors
const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};
const Calendar = () => {
  const [active, setActive] = useState('1');
  const [viewBooing, setViewBooking] = useState(false);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);

  // ** states
  const [calendarApi, setCalendarApi] = useState(null);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [addAppSidebarOpen, setAddAppSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  // ** Hooks
  const [isRtl] = useRTL();

  // ** AddEventSidebar Toggle Function
  const handleSidebarOpen = () => setAddSidebarOpen(!addSidebarOpen);

  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val) => setLeftSidebarOpen(val);

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Fragment>
            <Nav pills className="mb-2 ">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <Mail className="font-medium-1 me-50" />
                  <span className="fs-6">Event</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <MessageCircle className="font-medium-1 me-50" />
                  <span className="fs-6">Appointments</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <MessageSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Booking</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <MessageCircle className="font-medium-1 me-50" />
                  <span className="fs-6">Attendance</span>
                </NavLink>
              </NavItem>
            </Nav>


            <div className="app-calendar overflow-hidden border email-application">
              <div className='content-area-wrapper'>
                <Row className="g-0 w-100 overflow-auto">
                  {active !== '1'? (
                    <Col
                      id="app-calendar-sidebar"
                      className={classnames(
                        'col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column',
                        {
                          show: leftSidebarOpen
                        }
                    )}
                      >
                      {active === '3' ? (
                          <BookingSideLeft
                              store={store}
                              dispatch={dispatch}
                              updateFilter={updateFilter}
                              activeFilter={active}
                              toggleSidebar={toggleSidebar}
                              updateAllFilters={updateAllFilters}
                              handleSidebarOpen={handleSidebarOpen}
                              viewBooking={viewBooing}
                              setViewBooking={setViewBooking}
                          />):(
                          <SidebarLeft
                              store={store}
                              dispatch={dispatch}
                              updateFilter={updateFilter}
                              activeFilter={active}
                              toggleSidebar={toggleSidebar}
                              updateAllFilters={updateAllFilters}
                              handleSidebarOpen={handleSidebarOpen}
                          />)}
                      </Col>
                      ):null}

                  <Col className="position-relative ">
                    <TabContent className='w-100' activeTab={active}>
                      <TabPane tabId="1">
                        <EventManager/>
                      </TabPane>
                      <TabPane tabId="2">
                        <EventCalendar
                            isRtl={isRtl}
                            calendarApi={calendarApi}
                            toggleSidebar={toggleSidebar}
                            calendarsColor={calendarsColor}
                            setCalendarApi={setCalendarApi}
                            handleAddEventSidebar={handleSidebarOpen}
                        />
                      </TabPane>
                      <TabPane tabId="3">
                        {viewBooing ? (
                            <BookingType/>
                        ):(
                            <BookTable/>
                        )}

                      </TabPane>
                      <TabPane tabId="4">
                        <AttendanceCalendar
                            isRtl={isRtl}
                            calendarApi={calendarApi}
                            toggleSidebar={toggleSidebar}
                            calendarsColor={calendarsColor}
                            setCalendarApi={setCalendarApi}
                            handleAddEventSidebar={handleSidebarOpen}
                        />
                      </TabPane>
                    </TabContent>

                  </Col>

                </Row>
              </div>

            </div>
            {active === '1' && (
                <AddEventSidebar
                    store={store}
                    dispatch={dispatch}
                    addEvent={addEvent}
                    open={addSidebarOpen}
                    selectEvent={selectEvent}
                    updateEvent={updateEvent}
                    removeEvent={removeEvent}
                    calendarApi={calendarApi}
                    refetchEvents={refetchEvents}
                    calendarsColor={calendarsColor}
                    handleAddEventSidebar={handleSidebarOpen}
                />
            )}

            {active === '4' && (
               <AddClass openAddClass={addSidebarOpen} setOpenAddClass={handleSidebarOpen} />
            )}

          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Calendar;
