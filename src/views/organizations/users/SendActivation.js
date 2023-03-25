import React from 'react'
import { Button, Input, Label } from 'reactstrap'

export default function SendActivation() {
    const handleInputChanged =()=>{

    }
  return (
    <>
    <div>
    <Label className="form-label" for="basicInput">
              Email Subject
            </Label>
            <Input
              type="host"
              id="basicInput"
              placeholder="Enter Host Name"
              name="subject"
              onChange={handleInputChanged}
            />
    </div>
    <div>
    <Label className="form-label" for="basicInput">
              Email Message
            </Label>
            <Input
              type="textarea"
              id="basicInput"
              placeholder="Enter Message"
              name="message"
              onChange={handleInputChanged}
            />
    </div>
    <div className='d-flex justify-content-end mt-50'>
            <Button color='primary'>
                Send
            </Button>
        </div>
    </>
  )
}
