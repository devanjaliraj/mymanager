// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';

// ** Email App Component Imports
import SideTab from './components/SideTab';
// ** Third Party Components

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
// ** Styles
import '@styles/react/apps/app-email.scss';
const Progression = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
        <Fragment>
          <SideTab sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Fragment>
      </div>
    </div>
  );
};
export default Progression;
