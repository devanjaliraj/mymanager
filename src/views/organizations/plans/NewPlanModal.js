import React from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import AddPlanForm from './AddPlanForm';

export default function NewPlanModal({open,toggle,selectedOrg}) {
  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Add a New Plan</ModalHeader>
      <ModalBody>
        <AddPlanForm/>
      </ModalBody>
    </Modal>
  );
}
