import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, Eye, MoreVertical, Trash } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { convertDate } from '../../goals/helpers/converters';
import { deleteFormAction } from '../store/action';

const label = {
  clients: 'light-primary',
  employees: 'light-danger',
  leads: 'light-warning',
  relationships: 'light-success',
  vendors: 'light-muted',
  members: 'light-muted'
};
export default function FunnelTable({ store, active,dispatch }) {
  // ** STATES
  const [tableData, setTableData] = useState(null);

  const history = useHistory();

  // ** FUNCTIONS
  const handleSetData = (e) => {};

  const handleDetails = (row) => {
    history.push('/form-funnel/form-setting/' + row._id);
  };

  // ** Load initial Data
  useEffect(() => {
    if (store?.funnels) {
      switch (active) {
        case '1':
          setTableData(store?.funnels?.filter((x) => x?.status !== 'remove' && x?.isTemplate===false));
          break;
        case '2':
          setTableData(store?.funnels?.filter((x) => x?.status !== 'remove' && x?.isTemplate===true));
          break;
        // case '3':
        //   setTableData(store?.funnels?.filter((x) => x?.status === 'remove'));
        //   break;
        case '4':
          setTableData(store?.funnels?.filter((x) => x?.status === 'remove'));
          break;

        default:
          setTableData(store?.funnels);
          break;
      }
    }
  }, [store,active]);

  

  const MySwal = withReactContent(Swal)
  const handleRemove = async(row)=>{
    const res = await MySwal.fire({
      title:"Delete Form",
      text:"Are you sure you want to delete this form?",
      icon:"warning",
      cancelButtonText:"Cancel",
      confirmButtonText:"Delete",
      showCancelButton:true,
      buttonsStyling:false,
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton:"btn btn-outline-danger"
      },
    })
    if (res.value){
      //delete form
      dispatch(deleteFormAction(row._id))
    }
  }

  const columns = [
    // {
    //   name: 'Form',
    //   sortable: 'true',
    //   selector: (row) => row._id, // show snapshot of form
    // },
    {
      name: 'Name',
      sortable: 'true',
      selector: (row) => row.name,
      cell:(row)=><span onClick={()=>handleDetails(row)} >{row.name}</span>
    },
    {
      name: 'Type',
      sortable: 'true',
      selector: (row) => row.formType,
      cell:(row)=><span onClick={()=>handleDetails(row)}>{row.formType}</span>
    },
    {
      name: 'Last Updated',
      sortable: 'true',
      selector: (row) => row.updatedAt,
      cell: (row) => <span onClick={()=>handleDetails(row)}>{convertDate(row.updatedAt)}</span>
    },
    {
      name: 'Smartlist',
      selector: (row) => (
        <span>
          {row.smartlist && row.smartlist !== '' && `${row.smartList} > ${row.subCategory}`}
        </span>
      )
    },
    {
      name: 'Automated',
      selector: (row) => row.automateEntry,
      cell: (row) =>
        row.automateEntry ? (
          <Badge color="light-primary">Yes</Badge>
        ) : (
          <Badge color="light-secondary">No</Badge>
        )
    },
    {
      name: 'Contact Type',
      selector: (row) => row.memberType,
      cell: (row) => (
        <Badge color={label[row.memberType]}>{row.memberType}</Badge>)
       
    },

    {
      name: 'Action',
      selector: (row) => row._id,
      cell: (row) => (
        <>
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100" onClick={() => handleDetails(row)}>
                  <Edit size={14} className="me-50" />
                  <span className="align-middle">Edit</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(row)}>
                  <Trash size={14} className="me-50" />
                  <span className="align-middle">Remove</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </>
      )
    }
  ];
  return (
    <div className="employee-list-table">
      <div className="content-body">
        {tableData && tableData?.length ? (
          <DataTable
            noHeader
            className="react-dataTable"
            responsive
            data={tableData}
            style={{ cursor: 'pointer' }}
            sortIcon={<ChevronDown size={14} />}
            columns={columns}
            onRowClicked={handleDetails}
            pointerOnHover="cursor"
          />
        ) : (
          <div className="no-results show mx-auto">
            <h5>No Items Found</h5>
          </div>
        )}
      </div>
    </div>
  );
}
