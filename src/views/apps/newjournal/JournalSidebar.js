import { useState, useEffect, useCallback } from 'react';
import { Plus, ChevronLeft, ChevronRight, Home } from 'react-feather';
import { Badge, Button, Form, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createMyJournal, getMyjournalList } from '../../../requests/myJournal/getMyJournal';
import '../../../../src/assets/styles/jaornal.scss';

const JournalSidebar = ({
  collapse,
  handleJournalCollapse,
  parentcallback,
  sideBarUpdateData,
  setSideBarUpdateData,
  setSelectedItem
}) => {
  const [basicModal, setBasicModal] = useState(false);
  const [JournallistData, setJournalData] = useState([]);
  const [newJournal, setNewJournal] = useState('');
  const [active, setActive] = useState(0);

  const onIdChange = (event) => {
    parentcallback(event);
    localStorage.setItem('journalId', event);
  };
  const handlemodal = () => {
    setBasicModal(false);
  };
  const handlesetJournal = (e) => {
    setNewJournal(e.target.value);
  };
  const fetchData = useCallback(async () => {
    const response = await getMyjournalList();
    setJournalData(response);
    setSideBarUpdateData(false);
    if (response.length > 0) {
      setSelectedItem(response[0]);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData, sideBarUpdateData === true]);
  return (
    <div className="project-sidebar" style={{ width: '250px', height: '100%' }}>
      <div className="sidebar-content task-sidebar journal">
        <div className="task-app-menu">
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div
              className="ps-1 d-flex justify-content-between align-items-center"
              style={{ marginLeft: '0.5rem', marginTop: 10 }}
            >
              <Home size={20} />
              <div style={{ fontSize: '18px', fontWeight: 700 }}>My Journal</div>
              <Button className="btn-icon" color="flat-dark" onClick={handleJournalCollapse}>
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button>
            </div>
            <div
              className="project-create-workspace-btn my-1 btn text-center"
              style={{ width: '100%' }}
            >
              <Button color="primary" outline onClick={() => setBasicModal(!basicModal)}>
                <Plus size={14} className="me-25" />
                New Category
              </Button>
            </div>
            {JournallistData?.map((value, i) => (
              <ListGroupItem key={i} className={`ws-name list-item ${active === i && 'active'}`}>
                <div>
                  <div
                    onClick={() => {
                      onIdChange(value?._id);
                      setActive(i);
                    }}
                  >
                    <span>{value?.title}</span>
                    <Badge style={{ float: 'right' }} pill>
                      {value.count}
                    </Badge>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>Create New Journal</ModalHeader>
        <ModalBody className="p-2">
          <Form>
            <Input
              value={newJournal}
              onChange={handlesetJournal}
              type="text "
              className="form-control mt-1"
              placeholder="New Journal Name"
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={!newJournal}
            onClick={() => {
              setBasicModal(!basicModal);
              createMyJournal(newJournal).then((response) => {
                setNewJournal('');
              });
            }}
          >
            Submit
          </Button>
          <Button color="secondary" onClick={handlemodal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default JournalSidebar;
