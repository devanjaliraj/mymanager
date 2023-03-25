// ** Reactstrap Imports
import { UncontrolledTooltip, Button, Badge } from 'reactstrap'

// ** Third Party Components
import { Download, Trash, Edit } from 'react-feather'
import { confirm } from 'react-confirm-box'
import { deleteBook } from '../store'
import { store } from '@store/store'
const onDelete = async (client, id) => {
    const result = await confirm('Are you sure?', {
        closeOnOverlayClick: true,
        classNames: 'custom_confirm_box'
    })
    if (result) {
        store.dispatch(deleteBook(client, id))
        return
    }
}

// ** Table columns
import React from 'react'
import moment from 'moment'

const useBooksColumns = ({ setDeleteModal, setDeleteId }) => {
    const convertDateTimezone = (date, timezone) => {
        var diff = 0
        if(timezone) {
            let originDate = new Date(date.toLocaleString('en-US', {
                timeZone: timezone
            }))
            diff = originDate.getTime() - date.getTime()

        }
        let originDate = new Date(date.getTime() + diff)
        return originDate
    }
    const convertDate = (date, timezone) => {
        return moment(convertDateTimezone(new Date(date), timezone)).format('LL')
    }

    const convertTime = (date, timezone) => {
        return moment(convertDateTimezone(new Date(date), timezone)).format('LT')
    }

    const statusObj = {
        pending: 'light-warning',
        active: 'light-success',
        inactive: 'light-secondary'
    }
    const bookColumns = [
        {
            name: 'Name',
            sortable: true,
            minWidth: '120px',
            sortField: 'name',
            selector: (row) => row.name,
            cell: (row) => <span>{row.name}</span>
        },
        {
            name: 'Date',
            sortable: true,
            minWidth: '120px',
            sortField: 'date',
            cell: (row) => (
                <span>
                    {convertDate(row.startDate, row.timezone)}
                </span>
            )
        },
        {
            name: 'Time',
            minWidth: '100px',
            sortField: 'date',
            cell: (row) => (
                <span>
                    {convertTime(row.startDate, row.timezone)}
                </span>
            )
        },
        {
            name: 'Duration',
            sortable: true,
            minWidth: '150px',
            sortField: 'name',
            selector: (row) => row.duration,
            cell: (row) => <span>{row.duration} minutes</span>
        },
        {
            name: 'Booking Type',
            sortable: true,
            minWidth: '200px',
            sortField: 'name',
            selector: (row) => row.bookingType,
            cell: (row) => <span>{row.bookingType[0].title}</span>
        },
        {
            name: 'With',
            sortable: true,
            minWidth: '120px',
            sortField: 'name',
            selector: (row) => row.user,
            cell: (row) => <span>{row.user[0].firstName + " " + row.user[0].lastName}</span>
        },
        {
            name: 'Status',
            sortable: true,
            minWidth: '150px',
            sortField: 'name',
            selector: (row) => row.name,
            cell: (row) => <Badge
                className="text-capitalize"
                color='light-success'
                pill
            >
                Scheduled
            </Badge>
        },
        {
            name: 'Action',
            minWidth: '110px',
            cell: (row) => (
                <div className="column-action d-flex align-items-center">
                    <Trash
                        onClick={() => {
                            setDeleteModal(true)
                            setDeleteId(row?._id)
                        }}
                        className="text-body cursor-pointer me-1"
                        size={17}
                    />

                    <Edit
                        className="text-body cursor-pointer"
                        size={17}
                        onClick={() => {
                            window.location.href = '/book/update/' + row?._id
                        }}
                    />
                </div>
            )
        }
    ]

    return { bookColumns }
}

export default useBooksColumns
