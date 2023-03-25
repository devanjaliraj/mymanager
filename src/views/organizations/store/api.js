import { customInterIceptors } from "../../../lib/AxiosProvider"

const API = customInterIceptors();

export const addOrg = (payload)=>{ //
    return API.post('/organization',payload)
}

export const getOrgs = ()=>{//
    return API.get('/organization')
}

export const getOrg = (id)=>{//
    return API.get(`/organization/${id}`)
}

export const getOrgByPath = (path)=>{
    return API.get(`/organization/path/${path}`)
}

export const updateOrg = (id,payload) =>{
    return API.put(`/organization/${id}`,payload)
}

export const isOrgAvailable =(payload)=>{
    return API.get('/organization/check/availability',payload)
}

//----------location
export const addLocation = (id,payload) =>{
    return API.post(`/organization/${id}/location`,payload)
}

export const deleteOrgLocation =(id,locationId)=>{
    return API.delete(`/organization/${id}/location/${locationId}`)
}

export const updateOrgLocation =(id,locationId,payload)=>{
    return API.patch(`/organization/${id}/location/${locationId}`,payload)
}

//------- permissions
export const addPermission = (payload) =>{
    return API.post('/permission/',payload)
}

export const getOrgPermissions=()=>{
    return API.get('/permission/')
}

export const updateOrgPermissions = (id) =>{
    return API.put(`/permission/${id}`)
}

//-------- elements
export const addElement = (payload)=>{
    return API.post('/element/',payload)
}

export const getElements =()=>{
    return API.get('/element/')
}
export const getElementsByOrg =(id)=>{
    return API.get(`/element/${id}`)
}

export const createCustomElement =(id,defaultId) =>{
    return API.put(`/element/${id}/${defaultId}`,payload)
}

//---------- plans
export const createPlan =(payload)=>{
    return API.post('/subscription-plan/',payload)
}

export const getPlans =()=>{
    return API.get('/subscription-plan/')
}

export const getplanById =(id)=>{
    return API.get(`/subscription-plan/${id}`)
}

export const getPlanByOrg =(orgId)=>{
    return API.get(`/subscription-plan/organization/${orgId}`)
}

export const updatePlanById =(id,payload)=>{
    return API.patch(`/subscription-plan/${id}`,payload)
}

export const deletePlanById =(id)=>{
    return API.delete(`/subscription-plan/${id}`)
}

//---------- theming