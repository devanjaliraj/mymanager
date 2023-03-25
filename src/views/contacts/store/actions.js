import * as api from './api';

import {
  leadContactsReducer,
  vendorContactsReducer,
  relationshipContactsReducer,
  employeeContactsReducer,
  clientContactsReducer,
  totalCountReducer,
  setTagsReducer,
  setLeadsReducer
} from './reducer';
//------totals
//total client
export const totalContactsAction = () => async (dispatch) => {
  try {
    const clients = await api.getTotalClients();
    const leads = await api.getTotalLeads();
    const vendors = await api.getTotalVendors();
    const relationships = await api.getTotalRelationships();
    const employees = await api.getTotalEmployees();
    const payload = {
      clients: clients.data,
      leads: leads.data,
      vendors: vendors.data,
      relationships: relationships.data,
      employees: employees.data,
      total: clients.data + leads.data + vendors.data + relationships.data + employees.data
    };
    dispatch(totalCountReducer(payload));
  } catch (error) {
    //
  }
};

//---------data
//client list
export const clientContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getClientList();
    dispatch(clientContactsReducer(data));
  } catch (error) {
    //
  }
};
//lead list
export const leadsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getLeadsList();
    dispatch(leadContactsReducer(data));
  } catch (error) {
    //
  }
};
//vendor List
export const vendorContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getVendorsList();
    dispatch(vendorContactsReducer(data));
  } catch (error) {
    //
  }
};
//relationships list
export const relationshipsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getRelationshipsList();
    dispatch(relationshipContactsReducer(data));
  } catch (error) {
    //
  }
};
//employee list
export const employeesContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getEmployeeList();
    dispatch(employeeContactsReducer(data));
  } catch (error) {
    //
  }
};
//memger list
export const memberContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getMemberList();
    dispatch(memberContactsReducer(data));
  } catch (error) {
    //
  }
};

//tags
export const getTagsAction =() =>async (dispatch)=>{
  try {
    const {data} = await api.getTags()
    if(data){
      dispatch(setTagsReducer(data))
    }
  } catch (error) {
    
  }
}

export const updateTagsAction =(id,payload) =>async (dispatch)=>{
  try {
    const {data} = await api.updateTag(id,payload)
    if(data){
      dispatch(getTagsAction())
    }
  } catch (error) {
    
  }
}

export const deleteTagsAction =(id) =>async (dispatch)=>{
  try {
    const {data} = await api.deleteTag(id)
    if(data){
      dispatch(getTagsAction())
    }
  } catch (error) {
    
  }
}

export const createTagsAction =(payload) =>async (dispatch)=>{
  try {
    const {data} = await api.createTag(payload)
    if(data){
      dispatch(getTagsAction())
    }
  } catch (error) {
    
  }
}

export const getLeadsSourceAction = () => async(dispatch) =>{
  try {
    const {data} = await api.getLeadSource();
    if(data){
      dispatch(setLeadsReducer(data))
    }
  } catch (error) {
    
  }
}
export const createLeadsSourceAction =(payload) => async(dispatch)=>{
  try {
    const {data} = await api.addLeadSource(payload)
    if(data){
      dispatch(getLeadsSourceAction())
    }
  } catch (error) {
    
  }
}
export const deleteLeadsSourceAction =(id) => async(dispatch)=>{
  try {
    const {data} = await api.deleteLeadSource(id)
    if(data){
      dispatch(getLeadsSourceAction())
    }
  } catch (error) {
    
  }
}
export const updateLeadsSourceAction =(id,payload) => async(dispatch)=>{
  try {
    const {data} = await api.updateLeadSource(id,payload)
    if(data){
      dispatch(getLeadsSourceAction())
    }
  } catch (error) {
    
  }
}


//---pagination
//client list

//lead list

//vendor List

//relationships list

//employee list

//--------selecting
//selected contacts
