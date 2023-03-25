import { customInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();

//leads
export const getLeadsList = (payload) => {
  return API.get('/lead-contact/list', {
    params: payload
  });
};
export const getTotalLeads = () => {
  return API.get('/lead-contact/total-contact-count');
};

//client
export const getClientList = (options) => {
  return API.get('/client-contact', {
    params: options
  });
};
export const getTotalClients = () => {
  return API.get('/client-contact/total-clients-count');
};

//employee
export const getEmployeeList = (options) => {
  return API.get('/employee-contact/list', {
    params: options
  });
};

export const getTotalEmployees = () => {
  return API.get(`/employee-contact/total-employee`);
};
//relationships
export const getRelationshipsList = (payload) => {
  return API.get('/relation-contact/list', {
    params: payload
  });
};
export const getTotalRelationships = () => {
  return API.get('/relation-contact/total-contact-count');
};

//vendors
export const getTotalVendors = () => {
  return API.get('/vendor-contact/total-contact-count');
};
export const getVendorsList = (payload) => {
  return API.get('/vendor-contact/list', {
    params: payload
  });
};

//member
export const getMemberList = (options) => {
  return API.get('/member-contact', {
    params: options
  });
};
export const getTotalMembers = () => {
  return API.get('/member-contact/total-members-count');
};

//tags
export const getTags = () => {
  return API.get('/tags/')
}

export const createTag =(payload)=>{
  return API.post('/tags/',payload)
}

export const deleteTag =(id)=>{
  return API.put(`/tags/delete/${id}`)
}

export const updateTag =(id,payload)=>{
  return API.put(`/tags/update/${id}`,payload)
}

export const getLeadSource = () =>{
  return API.get('/lead-source')
}
export const updateLeadSource = (id,payload) =>{
  return API.put(`/lead-source/update/${id}`,payload)
}
export const deleteLeadSource = (id) =>{
  return API.put(`/lead-source/delete/${id}`)
}
export const addLeadSource = (payload) =>{
  return API.post('/lead-source',payload)
}
