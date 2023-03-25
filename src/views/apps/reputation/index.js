import { Fragment, useState } from 'react';

import GoogleFb from './googleFb';
import Sidebar from './Sidebar';

import '@styles/react/apps/app-email.scss';

const Advancesettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="overflow-hidden email-application">
      <GoogleFb />
      <div className="content-overlay"></div>
      <div className="content-area-wrapper  p-0 animate__animated animate__fadeIn">
        <Fragment>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Fragment>
      </div>
    </div>
  );
};

export default Advancesettings;
