import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { getCampaignList } from '../../../requests/userproof';
const columns = [
  {
    name: 'CAMPAIGN NAME',
    selector: 'campaign_name',
    sortable: true
  },
  {
    name: 'STATUS',
    selector: 'status',
    sortable: true
  },

  {
    name: 'POSITION',
    selector: 'position',
    sortable: true
  },
  {
    name: 'ACTION',
    selector: 'action',
    sortable: true
  }
];

function ProofTable() {
  const [CampaignData, setCampListData] = useState([]);

  useEffect(() => {
    getCampaignList().then((resp) => {
      setCampListData(resp?.data);
    });
  }, []);

  return (
    <>
      <DataTable
        noHeader
        subHeader
        sortServer
        pagination
        responsive
        columns={columns}
        sortIcon={<ChevronDown />}
        className="react-dataTable"
        paginationPerPage={10}
        data={CampaignData}
        selectableRows
        style={{ cursor: 'pointer' }}
      />
    </>
  );
}
export default ProofTable;
