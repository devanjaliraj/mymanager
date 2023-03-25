import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Eye, FileText, MoreVertical, Trash, Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import AvatarGroup from '../../../../../../@core/components/avatar-group';
import Roles from './roles';
import AddTask from './addTask/AddTask';
import { getTasksByUserAction } from '../../store/employee/action';

import EditTask from './editTask/EditTask';
import { contactListRequest } from '../../../../../contacts/employee/store/actions';

import { getUserData } from '../../../../../../auth/utils';

export default function Employees() {
  // ** States
  const [openAddTask, setOpenAddTask] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.employeeTasks);
  const storeRoles = useSelector((state) => state.roles);
  const storeEmployees = useSelector((state) => state.employeeContact);
  const taskList = store?.taskList;

  const toggleEditModal = () => setIsEditOpen(!isEditOpen);
  const toggleViewModal = () => setIsViewOpen(!isViewOpen);

  const handleViewModal = (data) => {
    dispatch(setViewPdfReducer(data));
    toggleViewModal();
  };

  const handleToggleEdit = (data) => {

    dispatch(setViewPdfReducer(data));
    toggleEditModal();
  };

  useEffect(() => {
    const userData = getUserData();
    const email = userData.email;
    //dispatch(getSignatureInitialStampAction(email));
    
    dispatch(getTasksByUserAction("task"));
  }, []);

  const toggleAddTask = () => {
    
    setOpenAddTask(!openAddTask);
  };



  const columns = [
    {
      name: 'Task',
      selector: (row) => row.title,
      sortable: true,
      minWidth: '300px',
      cell: (row) => (
        <div>
          <span>
            <b>{row.title}</b>
          </span>
          <span className="d-block text-secondary">{row.description}</span>
        </div>
      )
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      minWidth: '50px',
      sortable: true
    },
    {
      name: 'Assigned to',
      selector: (row) => row.empRoleId,
      cell: (row) => (
        <Label>{storeRoles?.rolesList?.find((r) => r._id === row?.empRoleId)?.roleName}</Label>
      ),
      minWidth: '50px',
      sortable: true
    },
    {
      name: 'Last Updated',
      selector: (row) => row.updatedAt,
      sortable: true,
      minWidth: '150px',
      cell: (row) => <span>{row.updatedAt?.split('T')[0] || ''}</span>
    },

    // {
    //   name: 'Status',
    //   selector: (row) => row.status,
    //   cell: (row) => (
    //     <Badge color={`${statusColors.find((x) => x.value === row.status)?.color}`}>
    //       {statusColors.find((x) => x.value === row.status)?.name}
    //     </Badge>
    //   )
    // },
    // {
    //   name: 'View',
    //   selector: (row) => row,
    //   cell: (row) => (
    //     <Button color="link" className="px-0 " onClick={() => handleViewModal(row)}>
    //       <Eye />
    //     </Button>
    //   )
    // },
    // {
    //   name: 'Take Action',
    //   cell: (row) => (
    //     <div className="column-action text-end">
    //       <UncontrolledDropdown>
    //         <DropdownToggle tag="div" className="btn btn-sm">
    //           <MoreVertical size={14} className="cursor-pointer" />
    //         </DropdownToggle>
    //         <DropdownMenu>
    //           <DropdownItem tag="span" className="w-100" onClick={() => handleToggleEdit(row)}>
    //             <Edit size={14} className="me-50" />
    //             <span className="align-middle">Change status</span>
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </UncontrolledDropdown>
    //     </div>
    //   )
    // }
  ];

  useEffect(() => {
    if (storeEmployees.employeeList.data === null) {
      dispatch(contactListRequest());
    }
  }, []);

  //   const ExpandedComponent = ({ data }) => {
  //     const empList = []
  //     for (const emp of data.empTaskStatus) {
  //       let x = storeEmployees.employeeList.data.list.find(x=>x._id === emp.empId)
  //       empList.push({...emp,fullName:x.fullName,email:x.email})
  //     }
  //     const cols = [
  //       {
  //         name: 'Full Name',
  //         sortable: true,
  //         minWidth: '240px',
  //         sortField: 'fullName',
  //         center: true,
  //         selector: (row) => row?.empId,
  //         cell: (row) => (
  //           <div className="d-flex justify-content-start align-items-middle">

  //             <div className="d-flex flex-column">
  //             <span className="fw-bolder">{row?.fullName}</span>
  //               <small className="text-truncate text-muted mb-0">{row?.email}</small>
  //             </div>
  //           </div>
  //         )
  //       },
  //       {
  //         name: 'Status',
  //         selector: (row) => row.status,
  //         cell: (row) => (
  //           <Badge color={`${statusColors.find((x) => x.value === row.status)?.color}`}>
  //             {statusColors.find((x) => x.value === row.status)?.name}
  //           </Badge>
  //         )
  //       },
  // //     {
  // //       name: 'Position',
  // //       sortable: true,
  // //       width: '130px',
  // //       sortField: 'role',
  // //       center:true,
  // //       selector: (row) => row?.position,
  // //       cell: (row) => <span>{row?.position}</span>
  // //   },
  // //   {
  // //     name: 'Phone',
  // //     width: '150px',
  // //     center:true,
  // //     selector: (row) => row.phone,
  // //     cell: (row) => <span>{row?.phone}</span>
  // // },
  // // {
  // //   name: 'Onboard',
  // //   width: '130px',
  // //   selector: (row) => row?.onBoarding,
  // //   center: true,
  // //   cell: (row) => <div className='p-1'>
  // //       <Chart options={options} series={80} type='radialBar' height={100} />
  // //   </div>
  // // },
  // {
  //   name: 'Actions',
  //   minWidth: '100px',
  //   center:true,
  //   cell: (row) => (
  //       <div className="column-action">
  //           <UncontrolledDropdown>
  //               <DropdownToggle tag="div" className="btn btn-sm">
  //                   <MoreVertical
  //                       size={14}
  //                       className="cursor-pointer"
  //                   />
  //               </DropdownToggle>
  //               <DropdownMenu>
  //                   <DropdownItem

  //                       className="w-100"

  //                   // onClick={() => store.dispatch(getUser(row._id))}
  //                   >
  //                       <FileText size={14} className="me-50" />
  //                       <span className="align-middle">View</span>
  //                   </DropdownItem>

  //                   <DropdownItem
  //                       tag="a"
  //                       href="/"
  //                       className="w-100"
  //                       onClick={(e) => {
  //                           e.preventDefault()
  //                           // store.dispatch(deleteUser(row._id))
  //                           setDeleteModal({
  //                               id: row._id,
  //                               show: true
  //                           })
  //                       }}
  //                   >
  //                       <Trash2 size={14} className="me-50" />
  //                       <span className="align-middle">Edit</span>
  //                   </DropdownItem>
  //               </DropdownMenu>
  //           </UncontrolledDropdown>
  //       </div>
  //   )
  // }
  //     ];

  //     return (
  //       <div className="container" >
  //         <DataTable noHeader responsive columns={cols} data={empList} className="react-dataTable" />
  //       </div>
  //     );
  //   };

  return (
    <div className="m-1" style={{ overflowY: 'scroll' }}>
      <Roles />
      <Col xl={12}>
        <div className="react-dataTable user-view-account-projects">
          <div className="card m-0 rounded-0 p-2">
            <div className="d-flex justify-content-between">
              <div>Your Employee Tasks</div>
              <Button color="primary" onClick={toggleAddTask}>
                Add Task
              </Button>
              {/* <input type="file" hidden ref={hiddenFileInput}></input> */}
            </div>
          </div>

          <DataTable
            noHeader
            responsive
            columns={columns}
            data={taskList}
            className="react-dataTable"
          />
        </div>
      </Col>

      <AddTask toggle={toggleAddTask} open={openAddTask} />
      
    </div>
  );
}
