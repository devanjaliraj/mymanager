// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiBorderRadius, BiUser } from 'react-icons/bi';
import { BiCalendarEvent } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { Check, MoreVertical, Trash2, X } from 'react-feather';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

//** third party imports */

import { ChevronDown } from 'react-feather';
import moment from 'moment';
// ** Custom Components
import Avatar from '@components/avatar';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

// ** Events Actions  Import
import BookAttendanceAction from './BookAttendanceAction';
import IsAttendClass from './IsAttendClass';
import { getClassbooking } from './store';

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

const BookList = (props) => {
  const { selectedClass } = props;
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const classBookingsList = useSelector((state) => state.attendance?.classBookings);

  const [editModalData, setEditModalData] = useState({});
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      width: '200px',
      selector: (row) => (
        <>
          {row?.image !== '' ? (
            <Avatar className="me-1" img={row?.image} width="32" height="32" initials />
          ) : (
            <Avatar color={color || 'primary'} className="me-1" />
          )}
          <span> {`${row?.fullName}` || 'N A'}</span>
        </>
      )
    },
    /*  {
      name: 'Progression',
      sortable: true,
      width: '150px',
      selector: (row) => row.progression
    },
     {
      name: 'Rank',
      sortable: true,
      selector: (row) => row?.rankName,
      cell: (row) => (
        <>
          {row?.rankImg !== '' ? (
            <Avatar className="me-1" img={row?.rankImg} width="32" height="32" initials />
          ) : (
            <Avatar color={color || 'primary'} className="me-1" />
          )}
        </>
      )
    }, */
    {
      name: 'Status',
      sortable: true,
      width: '150px',
      selector: (row) => row.status,
      cell: (row) => <IsAttendClass classRow={row} />
    },

    {
      name: 'Actions',
      allowOverflow: false,
      width: '120px',
      // cell: (row) => <BookAttendanceAction classRow={row} />
      // selector: (row) => row.action
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="span"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                setEditModalData(row);
                toggle2();
              }}
            >
              <FiEdit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="span"
              // href="/"
              className="w-100"
              onClick={() => {
                setDeleteModal({
                  id: row._id,
                  show: true
                });
              }}
            >
              <AiOutlineDelete size={14} className="me-50" />
              <span className="align-middle">Remove</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ];

  useEffect(() => {
    if (selectedClass?._id !== undefined && selectedClass?._id !== '') {
      dispatch(getClassbooking(selectedClass?._id));
    }
  }, [selectedClass?._id]);

  useEffect(() => {
    if (classBookingsList !== undefined && classBookingsList.length > 0) {
      const bookingDatalist = classBookingsList?.map((booking) => {
        const classEndDate = moment(selectedClass?.endDate);
        if (!moment().isAfter(classEndDate) && booking.status === 'Pending') {
          return { ...booking, action: 'none', value: booking._id, label: booking.fullName };
        } else if (moment().isAfter(classEndDate) && booking.status === 'Pending') {
          return {
            ...booking,
            status: 'DidNotAttended',
            action: 'reschedule',
            value: booking._id,
            label: booking.fullName
          };
        } else {
          return { ...booking, action: 'none', value: booking._id, label: booking.fullName };
        }
      });
      setBookingData(bookingDatalist);
    }
  }, [classBookingsList]);

  /*const bookAttendees = [
    {
      "_id": "63e913f0408e22497b0fd128",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "testClient",
      "image": "",
      "progression": "10",
      "status": "Attended",
      "action": "none",
      "rankImg": "",
      "rankName": "",
      // "ranks": [],
      "__v": 0
    },
    {
      "_id": "63e917ecdb3ec39e23c92f07",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "01-Client",
      "image": "",
      "progression": "20",
      "status": "DidNotAttended",
      "action": "reschedule",
      "rankImg": "",
      "rankName": "",
      // "ranks": [],
      "__v": 0
    },
    {
      "_id": "63e9188ddb3ec39e23c92f21",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "test testClient",
      "image": "",
      "progression": "",
      "status": "Attended",
      "action": "none",
      "rankImg": "",
      "rankName": "",
      // "ranks": [],
      "__v": 0
    }
  ]*/
  // ** States

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(bookingData.length / 10) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  return (
    <Fragment>
      <div className="react-dataTable mt-2 border rounded-2">
        <DataTable
          noHeader
          pagination
          columns={columns}
          paginationPerPage={10}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={bookingData}
        />
      </div>
    </Fragment>
  );
};
export default BookList;
