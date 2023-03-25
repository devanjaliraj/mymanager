import * as api from './api';
import {
  fetchRetention,
  deleteRetentionSuccess,
  deleteRetentionFail,
  resetDeleteRetentionStatus,

  addRetentionFail,
  addRetentionSuccess,
  resetAddRetentionStatus,
  editRetentionFail,
  editRetentionSuccess,
  resetEditRetentionStatus,
  
} from './reducer';
//parent retention
export const retentionFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRetention();
    dispatch(fetchRetention(data));
  } catch (error) { }
};
export const retentionAddAction = (retentionData) => async (dispatch) => {
  try {
    const { data } = await api.addRetention(retentionData);
  
    if (data.success === true) {
      dispatch(addRetentionSuccess(true));
    } else {
      dispatch(addRetentionFail(true));
    }
    dispatch(resetAddRetentionStatus());
    dispatch(retentionFetchAction());
  } catch (error) { }
};
export const retentionDeleteAction = (rule) => async (dispatch) => {
  try {
    const { data } = await api.deleteRetention(rule);
  
    if (data.success === true) {
      dispatch(deleteRetentionSuccess(true));
    } else {
      dispatch(deleteRetentionFail(true));
    }
    dispatch(resetDeleteRetentionStatus());
    dispatch(retentionFetchAction());
  } catch (error) { }
};

// export const retentionDeleteAction = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.deleteRetention(id);
//     if (data.success === true) {
//       dispatch(deleteRetentionSuccess(true));
//     } else {
//       dispatch(deleteRetentionFail(true));
//     }
//     dispatch(resetDeleteRetentionStatus());
//     dispatch(retentionFetchAction());
//   } catch (error) { }
// };
export const retentionEditAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editRetention(payload);
    if (data.success === true) {
      dispatch(editRetentionSuccess(true));
    } else {
      dispatch(editRetentionFail(true));
    }
    dispatch(resetEditRetentionStatus());
    dispatch(retentionFetchAction());
  } catch (error) { }
};

