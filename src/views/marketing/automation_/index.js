import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import Table from './Table';
import GraphApp from '../automationGraph';
import { updateAutomation, setAutomationDataList } from '../automationGraph/store/actions';
import { v4 as uuidv4 } from 'uuid';

// import FlowChart from './graph';

const Automation = () => {
  const [isGraphShow, setIsGraphShow] = useState(false);
  const onShowToGraph = () => {
    setIsGraphShow(true);
  };
  const onGoBackToTable = () => {
    setIsGraphShow(false);
  };
  const dispatch = useDispatch();

  const AutomationDataList = [
    {
      id: uuidv4(),
      automationName: 'task',
      startTime: '03/07/2023',
      contactInfo: {},
      campaign: 'a',
      contacts: 'Todo',
      status: 'progress',
      schedules: [
        {
          id: uuidv4(),
          type: 'email',
          startDate: '03/06/2023',
          template: '<p>sfs</p>',
          subject: ''
        },
        {
          id: uuidv4(),
          type: 'text',
          startDate: '03/06/2023',
          content: ''
        }
      ]
    },
    {
      id: uuidv4(),
      automationName: 'task1',
      startTime: '03/07/2023',
      contactInfo: {},
      campaign: 'b',
      contacts: 'Todo',
      status: 'done',
      schedules: [
        {
          id: uuidv4(),
          type: 'notification',
          startDate: '03/06/2023',
          template: '<p>sfs</p>',
          notification: ''
        },
        {
          id: uuidv4(),
          type: 'text',
          startDate: '03/06/2023',
          content: ''
        }
      ]
    }
  ];

  useEffect(() => {
    dispatch(setAutomationDataList(AutomationDataList));
  }, []);
  const allData = useSelector((state) => state.automation);
  return (
    <div className="tasks-border" style={{ display: 'block' }}>
      {isGraphShow ? (
        <GraphApp goBackToTable={onGoBackToTable} />
      ) : (
        <Table showGraph={onShowToGraph} allData={allData.allAutomations} />
      )}
    </div>
  );
};

export default Automation;
