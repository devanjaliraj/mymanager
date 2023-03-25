import React, { useState } from 'react';
import SlideDown from 'react-slidedown';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import Repeater from '../../../@core/components/repeater';
import { createPlanAction } from '../store/action';

export default function AddPlanForm({ dispatch, stepper, org, setOrg }) {
  const [form, setForm] = useState();
  const [benefits,setbenefits] = useState([""])

  const handleInputChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  };
  const handleBenefitsChanged =(e,i)=>{
    let b = benefits;
    if(b[i]!==undefined){
      b[i] = e.target.value
    }
    else{
      b.push(e.target.value)
    }
    setbenefits(b)
  }
  
  const handleSubmit = () => {
    const payload = {
      ...form,
      organizationId: org._id,
      benefits:benefits,
      validity:30
    }
    dispatch(createPlanAction(payload)).then(res=>{
      console.log(res)
      setOrg({...org,plan:{...res}})
    })
  };
  return (
    <>
      <div>
        <Label> Plan Name</Label>
        <Input type="text" name="name" onChange={handleInputChange} />
      </div>
      <div>
        <Label> Description</Label>
        <Input type="text" name='description' onChange={handleInputChange}/>
      </div>
      <div className='w-100'>
       <div className='d-flext justify-content-between w-100'>
       <Label className='my-auto'> Benefits</Label>
        <Button color='outline-primary' onClick={()=>setbenefits([...benefits,""])}>Add More</Button>
       </div>
        <Repeater count={benefits?.length || 0}>
          {(i) =>{
            const Tag = i === 0? 'div':SlideDown;
            return (
              <Tag key={i}>
                <Label>Benefit</Label>
                    <Input type='text' onChange={(e)=>handleBenefitsChanged(e,i)}/>
               
              </Tag>
            )
          }}
        </Repeater>
      </div>
      <div className="form-switch my-2 ps-0">
              <div className="d-flex">
                <p className="fw-bold me-auto mb-0">Freemium</p>
                <Input
                  type="switch"
                  name="isFreemium"
                  
                  onChange={(e)=>{setForm({...form,isFreemium:e.target.checked})}}
                />
              </div>
            </div>
     
      <div>
        <Label> Price</Label>
        <div className="d-flex justify-content-between">
          <Input type="number" name='price' className="w-100" onChange={handleInputChange}/>
          <h5 className="my-auto ms-50"> $/Month</h5>
        </div>
      </div>

      <div className="d-flex justify-content-end my-50">
        <Button color="primary" className="me-50" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </>
  );
}
