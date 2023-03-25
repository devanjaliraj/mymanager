import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { ChevronDown } from 'react-feather';
import { ArrowRight } from 'react-feather';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { createMyGoal, getMyGoalsCategory, getMyGoalList } from '../../../requests/userproof';
const columns = [
  {
    name: 'GOALS',
    selector: 'goal_name',
    sortable: true
  },
  {
    name: 'CONVERTIONS',
    selector: 'category_goal',
    sortable: true
  },
  {
    name: 'VALUE',
    selector: 'value',
    sortable: true
  },
  {
    name: 'URL',
    selector: 'url',
    sortable: true
  },
  {
    name: 'ACTIONS',
    selector: 'actions',
    sortable: true
  }
];

const SetGoal = ({ stepper }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goal_name, setGoalName] = useState('');
  const [value, setConversionValue] = useState('');
  const [url, setUrl] = useState('');
  const [category_goal, setCategoryGoal] = useState([]);
  const [goalData, setGoalData] = useState([]);
  const [dropDownSelect, setDropDownSelect] = useState([]);
  const [Reload, setReload] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      category_goal,
      goal_name,
      value,
      url
    };
    createMyGoal(formData).then((response) => {
      setReload(response);
      setIsModalOpen(!isModalOpen);
      setCategoryGoal('');
      setGoalName('');
      setConversionValue('');
      setUrl('');
    });
  };

  let newArray = [];
  for (let key in dropDownSelect) {
    if (dropDownSelect.hasOwnProperty(key)) {
      newArray.push({
        value: dropDownSelect[key]._id,
        label: dropDownSelect[key].name
      });
    }
  }

  // all Goal list api integration
  const GetAllData = () => {
    getMyGoalList().then((resp) => {
      setGoalData(resp?.data);
      setCategoryGoal('');
      setGoalName('');
      setConversionValue('');
      setUrl('');
    });
  };

  useEffect(() => {
    GetAllData();
  }, [Reload]);

  useEffect(() => {
    async function fetchData() {
      await getMyGoalsCategory().then((response) => {
        setDropDownSelect(response.data);
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="btnposition">
        <Button
          color="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)} centered>
            <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>Create your goal</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup className="mb-1">
                      <Label for="Category">Goal Category*</Label>
                      <Select
                        required
                        id="task-assignee"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={newArray}
                        onChange={(e) => {
                          setCategoryGoal(e.label);
                        }}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="12" md="12" sm="12">
                    <FormGroup className="mb-1">
                      <Label for="goal_name">Name your Goal*</Label>
                      <Input
                        type="text"
                        required
                        placeholder="Ex:signed up for basic plan"
                        onChange={(e) => {
                          setGoalName(e.target.value);
                        }}
                        value={goal_name}
                        id="goal_name"
                        name="goal_name"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12" className="mb-2">
                    <Label for="firstName">Set conversion value</Label>
                    <InputGroup>
                      <InputGroupText>$</InputGroupText>
                      <Input
                        required
                        className="form-control"
                        mask="$9999"
                        placeholder="100"
                        value={value}
                        onChange={(e) => {
                          setConversionValue(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </Col>

                  <Col md="12" sm="12" className="">
                    <FormGroup>
                      <Label for="url">Set goal completion URL*</Label>
                      <Input
                        type="text"
                        required
                        placeholder="URL"
                        onChange={(e) => {
                          setUrl(e.target.value);
                        }}
                        value={url}
                        id="url"
                        name="url"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button block className="btn-block my-1 text-right" color="primary">
                        Create Goal
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Create Goal
        </Button>
      </div>
      <DataTable
        noHeader
        subHeader
        sortServer
        pagination
        responsive
        columns={columns}
        sortIcon={<ChevronDown />}
        className="react-dataTable"
        paginationPerPage={10}
        data={goalData}
        // onSelectedRowsChange={handleRowSelected}
        selectableRows
      />

      <Row>
        <Col md="12">
          <div className="float-end">
            <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
              <span className="align-middle d-sm-inline-block d-none">Next</span>
              <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default SetGoal;
