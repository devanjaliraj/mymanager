import React, { useState } from 'react'
import { FcBusiness } from 'react-icons/fc'
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap'
import UpgradeModal from './UpgradeModal'

export default function Plans() {
    const[open,setOpen] = useState(false)

    const toggle=()=>setOpen(!open)
  return (
    <div className='w-100'>
       <Row>
        <Col md="4" >
        <Card className='h-100'>
            <CardBody>
              <FcBusiness size={24}/>
              <h5>Essencial</h5>
              {/* <Badge color='light-primary'>Enterprise</Badge> */}
              <p>2 Locations</p>
              <p>4 GB Storage</p>  
              <p>24/7 Support</p>  
            </CardBody>
        </Card>
       
        </Col>
        <Col md="4" >
        <Card className='h-100'>
            <CardBody>
              <FcBusiness size={24}/>
              <h5>Current Plan</h5>
              <Badge color='light-primary'>Business</Badge>
              <p>5 Locations</p>
              <p>7 GB Storage</p>  
              <p>24/7 Support</p>  
              
            </CardBody>
        </Card>
        
        </Col>
        <Col md="4" >
        <Card className='h-100'>
            <CardBody>
              <FcBusiness size={24}/>
              <h5>Current Plan</h5>
              <Badge color='light-primary'>Enterprise</Badge>
              <p>10 Locations</p>
              <p>12 GB Storage</p>  
              <p>24/7 Support</p> 
              <p>297 $/Month</p> 
              <Button color='primary' onClick={toggle}>Upgrade Your Plan</Button>
            </CardBody>
        </Card>
        </Col>
       </Row>
       <UpgradeModal open={open} toggle={toggle}/>
    </div>
  )
}
