import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Form, Button } from 'reactstrap';
import { ArrowLeft } from 'react-feather';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { addDisplayUrl, getDisplayUrlList } from '../../../requests/userproof';

const columns = [
  {
    name: 'URL List',
    selector: 'getUrlData',
    sortable: true
  }
];

const DisplaySite = ({ stepper }) => {
  const [modal, setModal] = useState(false);
  const [displayUrl, setDisplayUrl] = useState([]);
  const [getUrlData, setGetUrlData] = useState([]);
  const [selectUrl, setSelectUrl] = useState([]);
  const [GetUrl, setGetUrl] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDisplayUrl(displayUrl).then((response) => {
      setGetUrl(response.data.data);
      setModal(!modal);
    });
  };

  // all displayUrl list api integration
  const GetDisplayData = () => {
    getDisplayUrlList().then((resp) => {
      setGetUrlData(resp?.data);
    });
  };

  useEffect(() => {
    GetDisplayData();
  }, [GetUrl]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const tableData = getUrlData?.map((ele) => ({ getUrlData: ele?.displayUrl }));
  return (
    <>
      <div className="AddUrlBtn">
        <Button color="primary" onClick={toggleModal} className="btn-block">
          <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
            <ModalHeader toggle={() => setModal(!modal)} className="">
              Create your Url
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    <TagsInput
                      value={selectUrl}
                      onChange={setSelectUrl}
                      name="url"
                      placeHolder="Enter Display Url"
                    />
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button block className="btn-block my-1" color="primary">
                        Add Display Url
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Add Display Url
        </Button>
      </div>
      <DataTable
        className="react-dataTable"
        pagination
        selectableRows
        paginationPerPage={10}
        sortIcon={<ChevronDown size={10} />}
        data={tableData}
        columns={columns}
        noHeader
      />
      <Row>
        <div className="float-start ">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
        </div>
      </Row>
    </>
  );
};
export default DisplaySite;
