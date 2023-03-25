// ** React Imports
import React from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { store } from '@store/store';
import { getUser } from '../store';

// ** Icons Imports
import { Eye, MoreVertical } from 'react-feather';

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';
// import Note
import Note from './Note';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

// ** Renders Client Columns
const useColumns = ({ setDeleteModal }, { toggle }, { clientStore }, { setRow }) => {
  const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.photo?.length) {
      return (
        <Link
          to={`/contacts/client/view/${row._id}`}
          onClick={() => store.dispatch(getUser(row.id))}
        >
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link
          to={`/contacts/client/view/${row._id}`}
          onClick={() => store.dispatch(getUser(row.id))}
        >
          <Avatar
            color={color || 'primary'}
            className="me-1"
            content={row.fullName || 'N A'}
            initials
          />
        </Link>
      );
    }
  };

  const statusObj = {
    // pending: 'light-warning',
    false: 'light-success',
    true: 'light-secondary'
  };

  // const onDelete = async (id) => {
  //     const result = await confirm('Are you sure?', {
  //         closeOnOverlayClick: true,
  //         classNames: 'custom_confirm_box'
  //     })
  //     if (result) {
  //         store.dispatch(deleteClientContact(id))
  //         return
  //     }
  // }

  const columns = [
    {
      name: 'Client',
      sortable: true,
      minWidth: '17%',
      sortField: 'fullName',
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-start">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/contacts/client/view/${row._id}`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">{row.fullName}</span>{row.company && <span className='ms-50 text-muted fw-bolder'>({row.company})</span>}
            </Link>
            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Status',
      width: '10%',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.isFormer,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.isFormer]} pill>
          {row.isFormer === true ? 'Former' : 'Active'}
        </Badge>
      )
    },
    {
      name: 'Phone',
      width: '10%',
      selector: (row) => row.phone,
      cell: (row) => <span>{row.phone}</span>
    },
    {
      name: 'Position',
      sortable: true,
      width: '10%',
      sortField: 'position',
      selector: (row) => row.position,
      cell: (row) => <span>{row.position}</span>
    },
    // {
    //   name: 'Company',
    //   sortable: true,
    //   minWidth: '10%',
    //   sortField: 'company',
    //   selector: (row) => row.company,
    //   cell: (row) => <span>{row.company}</span>
    // },
    {
      name: 'Lead Source',
      width: '12%',
      sortable: true,
      sortField: 'leadSource',
      selector: (row) => row.leadSource,
      cell: (row) => row?.leadSource &&
      <Badge
          
          pill
          color={clientStore?.leadSources?.find((y) => y.title === row?.leadSource)?.color}
          className="me-50"
        >
          {row?.leadSource}
        </Badge>
      
      //<span className="text-capitalize">{row.leadSource}</span>
    },

    // {
    //     name: 'Address',
    //     sortable: true,
    //     minWidth: '10%',
    //     sortField: 'address',
    //     selector: (row) => row?.address,
    //     cell: (row) => {
    //         return (
    //             <>
    //                 <PrintAddress address={row?.address} />
    //             </>
    //         )
    //     }
    // },
    
    {
      name: 'Rate',
      width: '5%',
      center: true,
      selector: (row) => row.billing,
      cell: () => (
        <div className="table-rating">
          <span>0</span>
        </div>
      )
    },
    {
      name: 'Tags',
      width: '10%',
      // center: true,
      selector: (row) => row.tags,
      cell: (row) =>
        row?.tags &&
        row?.tags?.map((x, i) => (
          <Badge
            key={i + 1}
            pill
            color={clientStore?.tags?.find((y) => y.value === x)?.color}
            className="me-50"
          >
            {x}
          </Badge>
        ))
    },
    {
      name: 'Note',
      width: '5%',
      center: true,
      selector: (row) => row.note,
      cell: (row) => (
        // <Note toggle={toggle} note={row?.note} id={row._id} />
        <span title={row?.note}>
          <Eye
            onClick={() => {
              setRow(row);
              toggle();
            }}
            style={{ cursor: 'pointer' }}
          />
        </span>
      )
      // <Eye />
    },
    
    {
      name: 'Actions',
      minWidth: '10%',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem
                                tag={Link}
                                className="w-100"
                                to={`/contacts/client/view/${row._id}`}
                                onClick={() => store.dispatch(getUser(row.id))}
                            >
                                <FileText size={14} className="me-50" />
                                <span className="align-middle">Details</span>
                            </DropdownItem> */}
              {/* 
                            <DropdownItem
                                tag="span"
                                // href="/"
                                className="w-100"
                                onClick={(e) => {
                                    // e.preventDefault()
                                    // onDelete(row._id)
                                    setDeleteModal({
                                        id: row._id,
                                        show: true
                                    })
                                }}
                            // onClick={(e) => {
                            //     e.preventDefault()
                            //     store.dispatch(deleteClientContact(row._id))
                            // }}
                            >
                                <Trash2 size={14} className="me-50" />
                                <span className="align-middle">Delete</span>
                            </DropdownItem> */}
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //     // e.preventDefault()
                //     // onDelete(row._id)
                //     setDeleteModal({
                //         id: row._id,
                //         show: true
                //     })
                // }}
                // onClick={(e) => {
                //     e.preventDefault()
                //     store.dispatch(deleteClientContact(row._id))
                // }}
              >
                <BiPhoneCall size={14} className="me-50" />
                <span className="align-middle">Call</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //     // e.preventDefault()
                //     // onDelete(row._id)
                //     setDeleteModal({
                //         id: row._id,
                //         show: true
                //     })
                // }}
                // onClick={(e) => {
                //     e.preventDefault()
                //     store.dispatch(deleteClientContact(row._id))
                // }}
              >
                <AiOutlineMail size={14} className="me-50" />
                <span className="align-middle">Email</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //     // e.preventDefault()
                //     // onDelete(row._id)
                //     setDeleteModal({
                //         id: row._id,
                //         show: true
                //     })
                // }}
                // onClick={(e) => {
                //     e.preventDefault()
                //     store.dispatch(deleteClientContact(row._id))
                // }}
              >
                <BsChatLeftTextFill size={14} className="me-50" />
                <span className="align-middle">Text</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  return {
    columns
  };
};

export default useColumns;
