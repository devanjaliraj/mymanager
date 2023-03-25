import { setOrgs } from './reducer';

import * as api from './api';
import { toast } from 'react-toastify';

export const getOrgsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getOrgs();
    if (data) {
      dispatch(setOrgs(data));
    }
  } catch (error) {}
};

export const getOrgByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getOrg(id);
    return data;
  } catch (error) {}
};

export const getOrgByPathAction = (path) => async (dispatch) => {
  try {
    const { data } = await api.getOrgByPath(path);
    return data;
  } catch (error) {}
};


export const addNewOrgAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addOrg(payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        
        toast.success('Organization added successfully');
        return data.data[0]
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const updateOrgAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateOrg(id, payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('Organization updated successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const getOrgAvailableAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.isOrgAvailable(payload);
    return data;
  } catch (error) {}
};

export const addNewOrgLocationAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.addLocation(id,payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('New Location Added Successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const deleteOrgLocationAction = (id, locationId) => async (dispatch) => {
  try {
    const { data } = await api.deleteOrgLocation(id, locationId);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('Organization updated successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const updateOrgLocationAction = (id, locationId) => async (dispatch) => {
  try {
    const { data } = await api.deleteOrgLocation(id, locationId,payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('Location updated successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const addElementAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addElement(payload);
    if (data) {
      if (data.success === true) {
        
        toast.success('Element added successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const getElementsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getElements();
    if (data) {
      return data;
    }
  } catch (error) {}
};

export const getElementsByOrgAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getElementsByOrg(id);
    if (data) {
      return data;
    }
  } catch (error) {}
};

export const addCustomElementsAction = (id,defaultId,payload) => async (dispatch) => {
  try {
    const { data } = await api.createCustomElement(id,defaultId,payload);
    if (data) {
      if (data.success === true) {
        
        toast.success('Element updated successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};
export const createPlanAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createPlan(payload);
    if (data) {
      toast.success('Plan created successfully');
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};

export const getPlansAction = () => async (dispatch) => {
  try {
    const { data } = await api.getPlans();
    if (data) {
      if (data.success === true) {
       return data;
       
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const getPlansByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getplanById(id);
    if (data) {
      if (data.success === true) {
       return data;
       
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const getPlansByOrgAction = (orgId) => async (dispatch) => {
  try {
    const { data } = await api.getPlanByOrg(orgId);
    if (data) {
      if (data.success === true) {
       return data;
       
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const updatePlanByIdAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.updatePlanById(id,payload);
    if (data) {
      if (data.success === true) {
        toast.success('Plan updated successfully');
       
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const deletePlanByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePlanById(id);
    if (data) {
      if (data.success === true) {
        toast.success('Plan deleted successfully');
       
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const addPermissionsAction = (payload) =>async (dispatch) =>{
  try {
    const { data } = await api.addPermission(payload);
    if (data.success===true) {
      toast.success('Permissions created successfully');
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
}







