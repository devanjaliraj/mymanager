import { useEffect, useState } from 'react';
import { Edit2, Plus, Trash } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Badge, Button, Progress } from 'reactstrap';
import { setGoalsReducer } from '../store/reducer';

const useColumns = ({ toggleHabitDetails },
  { handleOpenAddSubHabit },
  { handleOpenEdit },
  { handleOpenDelete },{handleAccomplishClicked}) => {
  // ** STATES
  const [hoveredRow, setHoveredRow] = useState(null);

  // ** TOGGLERS
  const handleShowButtons = (rowId) => {
    setHoveredRow(rowId);
  };
  const handleNoButtons = () => {
    setHoveredRow('');
  };



  // ** FUNCTIONS
  const convertDate = (date) => {
    const d = new Date(date);
    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  };
  
  
  const columns = [
    {
      name: 'GOAL',
      sortable: true,
      minWidth: '12%',
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => (
        <div className="w-100" style={{cursor:"pointer"}} >
          <div
            className="d-flex  align-items-center"
            onMouseEnter={() => handleShowButtons(row._id)}
            onMouseLeave={handleNoButtons}
          >
            <div>
            <span className="fw-bolder d-block">{row.name}</span>
            <small className="text-truncate text-muted mb-0">{row.target}</small>
            </div>
           
            <div
              className={`justify-content-end w-100 ${
                hoveredRow === row._id ? 'd-flex' : 'd-none'
              }`}
            >
              <Button color="link" className="px-0" onClick={(e)=>{e.stopPropagation(); handleOpenAddSubHabit(row,'sub')}}>
                <Badge color="primary">
                  <Plus size={14} />
                </Badge>
              </Button>
              
              <Button color="link" className="px-0" onClick={(e)=>{e.stopPropagation(); handleOpenDelete(row)}}>
                <Badge color="danger">
                  <Trash size={14} />
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'START ',
      sortable: true,
      width: '15%',
      sortField: 'startDate',
      selector: (row) => row.startDate,
      cell: (row) => <span>{convertDate(row.startDate)}</span>
    },
    {
      name: 'PROGRESS',
      width: '20%',
      sortable: true,
      sortField: 'progress',
      selector: (row) => row.progress,
      cell: (row) => (
        <div className='w-100'>
        <span className='text-center d-block'>{row.status==='pending'?0:100} %</span>
        <Progress className="w-100" value={row.status==='pending'?0:100} max={100}>
      
        </Progress>
        </div>
      )
    },
    {
      name: 'ACCOMPLISH',
      width: '20%',
      // center: true,
      selector: (row) => row.status,
      cell: (row) =>
        row.status!=='done' ? (
          <Button color="primary" size="sm" onClick={()=>handleAccomplishClicked(row)}>
            <span className="text-small" style={{ fontSize: '11px' }}>
              Accomplish
            </span>
          </Button>
        ) : (
          <Button disabled="true" color="secondary" size="sm">
            <span style={{ fontSize: '11px' }}>Accomplish</span>
          </Button>
        )
    }
  ];
  return {
    columns
  };
};
export default useColumns;
