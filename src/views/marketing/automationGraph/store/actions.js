import {
  updateSelectedAutomation,
  addNewType,
  addNewActionToSchedule,
  setAllData,
  setEdit,
  setAddNewAutomation,
  setSmartList,
  setcontactInfo
} from './reducer';
import * as api from './api';
import { toast } from 'react-toastify';

export const updateAutomation = (newAutomation) => async (dispatch) => {
  try {
    dispatch(updateSelectedAutomation(newAutomation));
  } catch (error) {}
};

export const setAddNewTypeAndIndex = (newType) => async (dispatch) => {
  try {
    dispatch(addNewType(newType));
  } catch (error) {}
};

export const addNewAction = (insertData) => async (dispatch) => {
  try {
    dispatch(addNewActionToSchedule(insertData));
  } catch (error) {}
};

export const setAutomationDataList = (data) => async (dispatch) => {
  try {
    dispatch(setAllData(data));
  } catch (error) {}
};

export const setEditAutomation = (id) => async (dispatch) => {
  try {
    await dispatch(setEdit(id));
  } catch (error) {}
};

export const setNewAutomation = () => async (dispatch) => {
  try {
    dispatch(setAddNewAutomation());
  } catch (error) {}
};

export const getSmartList = () => async (dispatch) => {
  try {
    const data = await api.getSmartList();
    if (data.status == 200) {
      dispatch(setSmartList(data.data.data));
    } else {
      toast(data.msg);
    }
  } catch (error) {}
};

export const setContactInfo = (contactInfo) => async (dispatch) => {
  try {
    console.log("this is dat in action", contactInfo)
    dispatch(setcontactInfo(contactInfo));
  } catch (error) {}
};
