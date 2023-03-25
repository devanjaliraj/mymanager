import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { Button, Card } from 'reactstrap'

export default function ActionPlanTab({task}) {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = async (page) => {
      setCurrentPage(page.selected + 1);
    };
    const handleAddHabit = ()=>{

    }
    const handleAddSubGoal = ()=>{
      
    }
  const data = [
    {
      action:'sleep 7 hours per day',
      date:'2/22/2023 08:00 PM',
      status:'Accomplished',
      outcome:0
    },
    {
      action:'run for 30 minutes',
      date:'2/22/2023 ',
      status:'Lagging',
      outcome:0
    }
  ]
  const columns = [
    {
      name: 'SUB GOAL',
      selector: (row) => row.action,
      
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      
    }
  ]
  const CustomPagination = () => {
    const count = Math.ceil(data.length / 5);
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };
  return (
    <Card>
     <DataTable
     noHeader
     sortServer
     pagination
     responsive
     paginationServer
     columns={columns}
     className="react-dataTable"
     paginationComponent={CustomPagination}
     data={data}
      />
      
      <div className="d-flex justify-content-end p-1">
          <Button color="primary" className=" me-1" outline onClick={handleAddSubGoal}>
            
            <span className="align-middle d-sm-inline-block d-none ">Add Sub Goal</span>
          </Button>
          <Button color="primary" onClick={handleAddHabit}>
            <span className="align-middle d-sm-inline-block d-none">Add Habit</span>
            
          </Button>
        </div>
    </Card>
  )
}
