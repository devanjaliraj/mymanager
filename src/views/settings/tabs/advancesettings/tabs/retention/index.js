import React, { useState, useEffect } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
} from 'reactstrap';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { retentionAddAction, retentionFetchAction, retentionDeleteAction, retentionEditAction } from './store/actions';
import { generateOptions } from './generators';

function Retention() {
  const dispatch = useDispatch()
  const retentionList = useSelector((state) => state.retention.retentionList);
  const retentionData = [...retentionList]
  const optionsList = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,71,72,73,74,75,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
  const [addNew, setAddNew] = useState(false);
  const [payload, setPayload] = useState({});
  const [selected, setSelected] = useState(null)
  const [updatedData, setUpdatedData] = useState({})
  const handleRuleInput = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }
  const handleAddNew = () => {
    addNew ? toast.warning("Please Save Current Input First") : setAddNew(true)
  }
  const validator = () => {
    const retentionList = retentionData
    new list
    return (
      true
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (payload.upperLimit === "Select" || payload.lowerLimit === 'Select' || payload.colorCode === undefined) {
      toast.error("Please Select all Required values")
    }
    else {
      validator && dispatch(retentionAddAction(payload)), setAddNew(false);
      setPayload(null)
    }
  }
  const enable = (index) => {
    if (index === selected) {
      return (false)
    }
    else {
      return (true)
    }
  }
  const handleUpdate = () => {
    if (updatedData.colorCode != undefined) {
      dispatch(retentionEditAction(updatedData))
      setSelected(null)
    }
    else {
      toast("No Changes Observed")
    }
  }
  useEffect(() => {
    dispatch(retentionFetchAction())
  }, [])

  return (
    <Card className="m-2">
      <CardBody className="rounded-none">
        <CardTitle tag="h4">Retention</CardTitle>
        <CardText>
          {retentionData && retentionData.map((rule, index) => (
            <Row>
              <Col md={1}>
                <FormGroup  >
                  <span onClick={() => { setSelected(index) }}>
                    <Label className="mt-2">{' '}</Label>
                    <Input

                      onChange={(e) => setUpdatedData({ [e.target.name]: e.target.value, rule: rule })}
                      defaultValue={"#ea5455"}
                      value={enable(index) ? rule?.colorCode : updatedData?.colorCode}
                      type="color"
                      name="colorCode"
                      disabled={enable(index)}
                      placeholder="color placeholder" />
                  </span>
                </FormGroup>

              </Col>
              <Col md={4}>
                <FormGroup>
                  <span onClick={() => { setSelected(index) }}>
                    <Label>From</Label>
                    <Input

                      id="from1input"
                      name="from1"
                      type="select"
                      required
                      disabled={true}
                    >
                      <option>{rule?.lowerLimit}</option>
                    </Input>
                  </span>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <span onClick={() => { setSelected(index) }}>
                    <Label>To</Label>
                    <Input id="to1input" name="to1" type="select" disabled={true}   >
                      <option>{rule?.upperLimit}</option>
                    </Input>
                  </span>
                </FormGroup>
              </Col>
              <Col md={3} className="pt-2">

                <Button className="ms-1" hidden={enable(index)} disabled={!updatedData} onClick={handleUpdate} outline color="primary">Save</Button>
                <Button className="ms-1" hidden={retentionData.length - 1 != index} outline color="danger " onClick={() => dispatch(retentionDeleteAction(rule))}>Delete</Button>

              </Col>
            </Row>
          ))}
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-end">
                <FormGroup>
                  <Button outline color="primary" onClick={() => handleAddNew()}>Add new Rule</Button>
                </FormGroup>
              </div>
            </Col>
          </Row>
          {addNew &&
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={1}>
                  <FormGroup>
                    <Label for="exampleColor">Color</Label>
                    <Input type="color" onChange={handleRuleInput} name="colorCode" id="exampleColor" placeholder="color placeholder" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>From</Label>
                    <Input id="from2input" onChange={handleRuleInput} name="lowerLimit" type="select" required >
                      {retentionData && retentionData.length < 1 ?
                      <>
                      <option>Select</option>
                      {
                        optionsList.map((value) =>
                        (
                          <>
                            <option>{value}</option>
                          </>
                        ))}</>
                        : generateOptions(retentionData, optionsList, "from")}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>To</Label>
                    <Input id="to2input" onChange={handleRuleInput} name="upperLimit" type="select" required>
                      {retentionData && retentionData.length < 1 ?
                      <>
                      <option>Select</option>
                        {optionsList.map((value) =>
                        (
                          <> 
                            <option>{value}</option>
                          </>
                        ))}
                        </>
                        : generateOptions(retentionData, optionsList, "to")}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button disabled={!payload} color="primary" type="submit">
                  Update
                </Button>
              </div>
            </form>
          }
        </CardText>
      </CardBody>
    </Card>
  );
}

export default Retention;
