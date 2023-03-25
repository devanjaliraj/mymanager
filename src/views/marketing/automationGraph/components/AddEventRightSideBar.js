// ** React Import
import { useMemo, Fragment, useEffect, useRef, useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';
import Avatar from '../../../../@core/components/avatar';
import Select, { components } from 'react-select';
// ** Utils
import { Calendar, File, Plus, Icon, Settings, Users } from 'react-feather';
import {
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Label,
  Spinner
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import { selectThemeColors } from '../../../../utility/Utils';
// import { ChevronDown, ChevronUp } from 'react-feather';

const AddEventRightSideBar = ({ open, toggleSidebar }) => {
  // ** States
  const [contactType, setContactType] = useState([]);
  const contactTypes = [
    { value: 'ContactType', label: 'ContactType' },
    { value: 'SmartList', label: 'SmartList' }
  ];
  const handleSidebarClosed = () => {
    //
  };

  return (
    <Sidebar
      size="sm"
      open={open}
      // title={`Edit ${showData.content_type}`}
      title="Edit Contact"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Card className="post">
        <CardBody>
          <Label>Add New Event</Label>
        </CardBody>
      </Card>
    </Sidebar>
  );
};

export default AddEventRightSideBar;
