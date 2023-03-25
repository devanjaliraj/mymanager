import React, { useEffect, useRef, useState } from 'react';
import { BiBuilding } from 'react-icons/bi';
import {
  Button,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import { addNewOrgAction } from '../../store/action';
import { setOrgs } from '../../store/reducer';
import NewOrgForm from './NewOrgForm';
import Wizard from '@components/wizard';
import { CreditCard, Mail } from 'react-feather';
import AddPlanForm from '../../plans/AddPlanForm';
import PermissionsForm from '../../permissions/PermissionsForm';
import SendActivation from '../../users/SendActivation';

export default function CreateOrgModal({ open, toggle, store, dispatch }) {
  const [stepper, setStepper] = useState(null);
  const [org,setOrg] = useState({})
  const ref = useRef();
  const steps = [
    {
      id: 'org',
      title: 'Basic Info',
      subtitle: 'Add Organization Info',
      icon: <BiBuilding />,
      content: <NewOrgForm dispatch={dispatch} stepper={stepper} type="modern-vertical" org={org} setOrg={setOrg} />
    },
    {
      id: 'plan',
      title: 'Create Plan',
      subtitle: 'Add Subscription plan for the organization',
      icon: <CreditCard />,
      content: <AddPlanForm dispatch={dispatch} stepper={stepper} type="modern-vertical" org={org} setOrg={setOrg}/>
    },
    {
      id: 'permission',
      title: 'Setup Permissions',
      subtitle: 'Setup Organization Permissions',
      icon: <CreditCard />,
      content: <PermissionsForm dispatch={dispatch} stepper={stepper} type="modern-vertical" org={org} setOrg={setOrg}/>
    },
    {
      id: 'email',
      title: 'Send Email',
      subtitle: 'Send Activation Email',
      icon: <Mail />,
      content: <SendActivation dispatch={dispatch} stepper={stepper} type="modern-vertical" org={org} setOrg={setOrg}/>
    }
  ];

  useEffect(()=>{
console.log("org",org)
  },[org])
  return (
    <Modal isOpen={open} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>Create an Organization</ModalHeader>
      <ModalBody>
        <div className="modern-vertical-wizard">
          <Wizard
            type="modern-vertical"
            ref={ref}
            steps={steps}
            options={{
              linear: false
            }}
            instance={(el) => setStepper(el)}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
