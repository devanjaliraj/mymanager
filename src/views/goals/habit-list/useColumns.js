import { useState } from 'react';
import { Edit2, Plus, Trash } from 'react-feather';
import { Badge, Button, Progress } from 'reactstrap';
import { convertDate } from '../helpers/converters';

const useColumns = (
  { toggleHabitDetails },
  { handleOpenAddSubHabit },
  { handleOpenEdit },
  { handleOpenDelete }
) => {
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
  const columns = [
    {
      name: 'GOAL NAME',
      sortable: true,
      minWidth: '14%',
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => (
        <div
          className="w-100"
          style={{ cursor: 'pointer' }}
          onClick={() => toggleHabitDetails(row)}
        >
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
             {row?.type==='target' &&  <Button
                color="link"
                className="px-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenAddSubHabit(row, 'sub');
                }}
              >
                <Badge color="primary">
                  <Plus size={14} />
                </Badge>
              </Button>}
              {/* <Button
                color="link"
                className="px-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit(row, 'origin');
                }}
              >
                <Badge color="secondary">
                  <Edit2 size={14} />
                </Badge>
              </Button> */}
              <Button
                color="link"
                className="px-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDelete(row);
                }}
              >
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
      name: 'TYPE',

      maxWidth: '5%',

      selector: (row) => row.type,
      cell: (row) => <span>{row.type}</span>
    },
    {
      name: 'SUB',

      maxWidth: '5%',

      selector: (row) => row.subGoals,
      cell: (row) =>
        row.subGoals && row.subGoals?.length > 0 ? (
          <span>
            {row.subGoals.filter((x) => x.status === 'done').length}/{row.subGoals.length}
          </span>
        ) : (
          <span>N/A</span>
        )
    },
    {
      name: 'START ',
      sortable: true,
      width: '10%',
      sortField: 'startDate',
      selector: (row) => row.startDate,
      cell: (row) => <span>{row?.type==="target"?convertDate(row.startDate):convertDate(row.createdAt)}</span>
    },
    // {
    //   name: 'END ',
    //   sortable: true,
    //   minWidth: '110px',
    //   sortField: 'endDate',
    //   selector: (row) => row.endDate,
    //   cell: (row) => <span>{convertDate(row.endDate)}</span>
    // },
    {
      name: 'STREAK',
      width: '14%',
      sortable: true,
      sortField: 'progress',
      selector: (row) => row.progress,
      cell: (row) => (
        <div className='w-100'>
          <span className='d-block text-center'> {row?.measureTo} days</span>
          <Progress className="w-100" value={row.currentProgress} max={row.measureTo}>
          {row.currentProgress} days
        </Progress>
        </div>
      )
    },
    {
      name: 'STATUS',
      width: '10%',
      // center: true,
      selector: (row) => row.tags,
      cell: (row) =>
        row?.tags &&
        row?.tags?.map((x, i) => (
          <Badge key={i + 1} pill color="light-primary">
            {x}
          </Badge>
        ))
    },
    {
      name: 'RECORD',
      width: '14%',
      // center: true,
      selector: (row) => row.progress,
      cell: (row) =>
        row.progress !== row.total ? (
          <Button color="primary" size="sm" onClick={() => toggleHabitDetails(row)}>
            <span className="text-small" style={{ fontSize: '11px' }}>
              RECORD
            </span>
          </Button>
        ) : (
          <Button disabled="true" color="secondary" size="sm">
            <span style={{ fontSize: '11px' }}>RECORD</span>
          </Button>
        )
    }
  ];
  return {
    columns
  };
};
export default useColumns;
