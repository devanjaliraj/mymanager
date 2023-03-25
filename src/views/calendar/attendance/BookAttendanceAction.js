// ** React Imports
import React, { useState } from 'react';
import { Badge, Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const BookAttendanceAction = (props) => {
  const { classRow } = props;
  const [bookRescheduleModal, setBookRescheduleModal] = useState(false);

  return (
    <div>
      <div className="d-flex">
        <div className="cursor-pointer">
          {classRow.action === 'reschedule' ? (
            <Badge onClick={() => setBookRescheduleModal(true)} color="light-warning">
              Reschedule
            </Badge>
          ) : (
            <Badge color="light-success">None</Badge>
          )}
        </div>
      </div>
      <Modal
        toggle={() => setBookRescheduleModal(false)}
        className="modal-dialog-centered"
        isOpen={bookRescheduleModal}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setBookRescheduleModal(false)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h3 className="text-center mb-1">Are you sure to reschedule ?</h3>
          <Row>
            <Col className="text-center mt-1" xs={12}>
              <Button className="mt-1 me-3" outline onClick={() => setBookRescheduleModal(false)}>
                One Time
              </Button>
              <Button
                className="mt-1"
                color="primary"
                onClick={() => {
                  setBookRescheduleModal(false);
                }}
              >
                Ongoing
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BookAttendanceAction;
