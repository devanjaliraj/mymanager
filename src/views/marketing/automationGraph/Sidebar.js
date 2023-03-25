// ** React Imports
import { Link, useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Plus, Info, Trash, Home } from 'react-feather';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';

const Sidebar = (props) => {
  // ** Props
  const {
    store,
    sidebarOpen,
    toggleCompose,
    dispatch,
    getMails,
    resetSelectedMail,
    setSidebarOpen,
    setOpen
  } = props;

  // ** State Vars
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

  // ** Vars
  const params = useParams();

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    // dispatch(getMails({ ...store.params, folder }))
    dispatch(resetSelectedMail());
    // dispatch(resetSelectedTickets())
  };

  const handleLabel = (label) => {
    dispatch(getMails({ ...store.params, label }));
    dispatch(resetSelectedMail());
  };

  const handleCreateTicketClick = () => {
    setIsCreateTicketModalOpen(true);
    setSidebarOpen(false);
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if ((params.status && params.status === value) || (params.label && params.label === value)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="p-1 d-flex justify-content-between align-items-center">
              <Home size={20} />
              <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>
                My Automations
              </div>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem
                  tag={Link}
                  // to='/apps/automation/all'
                  onClick={() => handleFolder('inbox')}
                  action
                  active={!Object.keys(params).length || handleActiveItem('all')}
                >
                  <Mail size={18} className="me-75" />
                  <span className="align-middle">Personal</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  // to='/apps/automation/draft'
                  onClick={() => handleFolder('sent')}
                  action
                  active={handleActiveItem('draft')}
                >
                  <Send size={18} className="me-75" />
                  <span className="align-middle">Business</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  // to='/apps/automation/scheduled'
                  onClick={() => handleFolder('draft')}
                  action
                  active={handleActiveItem('scheduled')}
                >
                  <Edit2 size={18} className="me-75" />
                  <span className="align-middle">Others</span>
                </ListGroupItem>
                <h6 className="section-label mt-3 mb-1 px-2">Labels</h6>
                <div className="create-workspace-btn mt-1">
                  <Button color="primary" block outline onClick={() => setOpen()}>
                    <Plus size={14} className="me-25" />
                    New automation
                  </Button>
                </div>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
