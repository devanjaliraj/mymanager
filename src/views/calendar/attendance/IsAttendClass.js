import React, { useState } from 'react';
import { Button } from 'reactstrap';

const YesNoButton = (props) => {
  const { classRow } = props;
  const [selectedOption, setSelectedOption] = useState(classRow?.status ? classRow?.status : 'no');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="d-flex">
      <Button
        style={{ borderRadius: '0px !important' }}
        size="sm"
        color={selectedOption === 'yes' ? 'success' : 'outline-success'}
        onClick={() => handleOptionSelect('yes')}
      >
        Yes
      </Button>{' '}
      <Button
        style={{ borderRadius: '0px !important' }}
        size="sm"
        color={selectedOption === 'no' ? 'danger' : 'outline-danger'}
        onClick={() => handleOptionSelect('no')}
      >
        No
      </Button>
    </div>
  );
};

export default YesNoButton;
