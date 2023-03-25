import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Form, Label, Input, Button } from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { getDisplayUrlList } from '../../../requests/userproof';

const columns = [
  {
    name: 'URL List',
    selector: 'getData',
    sortable: true
  }
];

const CaptureData = ({ stepper }) => {
  const [modal, setModal] = useState(false);
  const [getData, setGetData] = useState([]);
  const [selected, setSelected] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const DisplayURl = () => {
    getDisplayUrlList().then((resp) => {
      setGetData(resp?.data);
    });
  };
  useEffect(() => {
    DisplayURl();
  }, []);

  const tableData = getData?.map((ele) => ({ getData: ele?.displayUrl }));
  return (
    <>
      <div className="AddUrlBtn">
        <Button color="primary" onClick={toggleModal} className="btn-block">
          <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
            <ModalHeader toggle={() => setModal(!modal)} className="">
              Auto Lead Capture
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name="fruits"
                      placeHolder="enter url"
                    />
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button block className="btn-block my-1" color="primary">
                        Add Url
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Auto Lead Capture
        </Button>
      </div>
      <DataTable
        className="react-dataTable"
        pagination
        selectableRows
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        data={tableData}
        columns={columns}
        noHeader
      />
      <Row>
        <div className="d-flex justify-content-between mt-3 ">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Row>
    </>
  );
};
export default CaptureData;
