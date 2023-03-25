import React, { useState } from 'react'
import { Button, FormFeedback, Input, InputGroup, InputGroupText, Label } from 'reactstrap'
import { addNewOrgAction } from '../../store/action'

export default function NewOrgForm({dispatch,org,setOrg,stepper}) {

  const [form,setForm] = useState({})
    const handleInputChanged = (e)=>{
        setForm({...form,[e.target.name]:e.target.value,isVerified:false})
    }
    const handleSubmit = ()=>{
      dispatch(addNewOrgAction({...form})).then(res=>{
        setOrg({...res})
      })
      //stepper.next()
      
    }
  return (
    <>
    <div>
          <Label>Name</Label>
          <Input type="text" name='name' placeholder="Enter Org Name" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="text" name='email' placeholder="Enter Org Email" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Contact</Label>
          <Input type="number" name='contact' placeholder="Enter Org Contact Number" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Full Address</Label>
          <Input type="text" name='address' placeholder="Enter Org Full Address" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Location Signup Link</Label>
          <InputGroup>
            <InputGroupText>www.mymanager.com/</InputGroupText>
            <Input type='text' placeholder='Org Name' name='path' onChange={handleInputChanged}/>
            <InputGroupText>/signup</InputGroupText>
          </InputGroup>
          <FormFeedback >
          Sweet! That name is available.
          </FormFeedback>

        </div>
        <div className='d-flex justify-content-end mt-50'>
            <Button color='primary' onClick={handleSubmit}>
                Create
            </Button>
        </div>
    </>
  )
}
