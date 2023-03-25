import { useState } from 'react';
import { Collapse, Button, Card, CardBody } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import JournalSidebar from './JournalSidebar';
import JournalList from './JournalList';
import JournalDetail from './JournalDetail';
import '../../../../src/assets/styles/jaornal.scss';

export default function JournalMain() {
  const [collapse, setCollapse] = useState(false);
  const [sideBarUpdateData, setSideBarUpdateData] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailsSelectedItem, setDetailsSelectedItem] = useState(null);
  const [viewoneId, setViewoneId] = useState('');
  const [statusOpen, setStatusOpen] = useState('close');
  const [viewDetailsId, setViewDetailsId] = useState('');
  const handleJournalCollapse = () => setCollapse(!collapse);

  const parentcallback = (data) => {
    setViewoneId(data);
  };
  return (
    <div>
      <Card>
        <CardBody className="p-0">
          <div className="project-right" style={{ float: 'left !important' }}>
            <div className="content-wrapper">
              <div className="content-body">
                <div style={{ display: 'flex', height: 'calc(100vh - 12rem)' }}>
                  <div className={`${collapse ? null : 'project-workspace-container'}`}>
                    <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 200, hide: 500 }}>
                      <JournalSidebar
                        parentcallback={parentcallback}
                        collapse={collapse}
                        handleJournalCollapse={handleJournalCollapse}
                        sideBarUpdateData={sideBarUpdateData}
                        setSideBarUpdateData={setSideBarUpdateData}
                        setSelectedItem={setSelectedItem}
                      />
                    </Collapse>
                    <div
                      className={`${collapse ? 'project-collapse-inactive m-1' : 'tasks-area '}`}
                    >
                      <div className="workspace-title">
                        {collapse ? (
                          <Button
                            className="btn-icon btn btn-flat-dark btn-sm"
                            color="flat-dark"
                            onClick={handleJournalCollapse}
                          >
                            <ChevronRight size={14} />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="Content-journal d-flex">
                    <div className="journal-cal-list p-1">
                      <JournalList
                        viewoneId={viewoneId}
                        setStatusOpen={setStatusOpen}
                        setViewDetailsId={setViewDetailsId}
                        sideBarUpdateData={sideBarUpdateData}
                        setSideBarUpdateData={setSideBarUpdateData}
                        selectedItem={selectedItem}
                        setDetailsSelectedItem={setDetailsSelectedItem}
                      />
                    </div>
                    <div className="jaornal-text">
                      <JournalDetail
                        statusOpen={statusOpen}
                        setStatusOpen={setStatusOpen}
                        viewDetailsId={viewDetailsId}
                        setSideBarUpdateData={setSideBarUpdateData}
                        detailsSelectedItem={detailsSelectedItem}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
