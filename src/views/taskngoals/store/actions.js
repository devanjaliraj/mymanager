import * as api from './api';
import {
  fetchGoals,
  resetGoals,
  fetchSubGoals,
  fetchActionPlan,
  resetSubGoals,
  resetActionPlan,
  deleteGoalsSuccess,
  deleteGoalsFail,
  resetDeleteGoalsStatus,
  fetchGoalsFail,
  fetchGoalsStatusReset,
  fetchGoalsSuccess,
  addGoalsFail,
  addGoalsSuccess,
  resetAddGoalsStatus,
  editGoalsFail,
  editGoalsSuccess,
  resetEditGoalsStatus,
  fetchGoalsCategoriesRankFail,
  fetchGoalsCategoriesRankSuccess
} from './reducer';
//parent goals
export const goalsFetchAction = (id) => async (dispatch) => {
  try {
    dispatch(resetGoals())
    const { data } = await api.fetchGoals(id);
    if(data?.success)
    {
      dispatch(fetchGoals(data.data));
    }
    else{
      dispatch(fetchGoals([]))
    }
    
  } catch (error) {}
};
export const subGoalsFetchAction = (id) => async (dispatch) => {
  try {
    dispatch(resetSubGoals())
    const { data } = await api.fetchSubGoals(id);
    if(data?.success)
    {
      dispatch(fetchSubGoals(data.data));
    }
    else{
      dispatch(fetchSubGoals([]))
    }
    
  } catch (error) {}
};
export const actionPlanFetchAction = (id) => async (dispatch) => {
  try {
    dispatch(resetActionPlan())
    const { data } = await api.fetchActionPlan(id);
    if(data?.success)
    {
      dispatch(fetchActionPlan(data.data));
    }
    else{
      dispatch(fetchActionPlan([]))
    }
    
  } catch (error) {}
};
export const actionPlanAddAction = (id,workspaceId,payload) => async (dispatch) => {
  try {
    const { data } = await api.addActionPlan(id,payload);
    console.log(id,"this is id")
    console.log(data)
    if (data.success === true) {
      dispatch(addGoalsSuccess(true));
    } else {
      dispatch(addGoalsFail(true));
    }
    dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workspaceId));
  } catch (error) {}
};
export const goalsAddAction = (workSpaceId,type,payload) => async (dispatch) => {
  try {
    const { data } = await api.addGoals(type,payload);
    if (data.success === true) {
      dispatch(addGoalsSuccess(true));
    } else {
      dispatch(addGoalsFail(true));
    }
    dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workSpaceId));
  } catch (error) {}
};
export const subGoalsAddAction = (parentId,workSpaceId,type,payload) => async (dispatch) => {
  try {
    const { data } = await api.addSubGoals(parentId,type,payload);
    if (data.success === true) {
      dispatch(addGoalsSuccess(true));
    } else {
      dispatch(addGoalsFail(true));
    }
    dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workSpaceId));
  } catch (error) {}
};
export const goalsEditAction = (id,workspaceId,payload) => async (dispatch) => {
  try {
    const { data } = await api.editGoals(payload,id);
    if (data.success === true) {
      dispatch(editGoalsSuccess(true));
    } else {
      dispatch(editGoalsFail(true));
    }
    dispatch(resetEditGoalsStatus())
    dispatch(goalsFetchAction(workspaceId));
  } catch (error) {}
};
export const goalsDeleteAction = (workspaceId,id) => async (dispatch) => {
  try {
    const { data } = await api.deleteGoals(id);
    if (data.success === true) {
      dispatch(deleteGoalsSuccess());
    } else {
      dispatch(deleteGoalsFail());
    }
    dispatch(resetDeleteGoalsStatus());
    dispatch(goalsFetchAction(workspaceId));
  } catch (error) {}
};

// //goals categories
// export const goalsCategoriesFetchAction = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchGoalsCategories();
//     dispatch(fetchGoalsCategories(data?.data));
//   } catch (error) {}
// };
// export const categoriesAddAction = (categoriesData) => async (dispatch) => {
//   try {
//     const { data } = await api.addGoalsCategories(categoriesData);
//     if (data.success === true) {
//       dispatch(fetchGoalsCategoriesSuccess(true));
//       dispatch(goalsFetchAction());
//     } else {
//       dispatch(fetchGoalsCategoriesFail(true));
//     }
//     dispatch(resetFetchGoalsCategories());
//   } catch (error) {}
// };
// //categories  ranks
// export const goalsCategoriesRankFetchAction = (name) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchGoalsCategoriesRank(name);
//     dispatch(fetchGoalsCategoriesRank(data?.data));
//   } catch (error) {}
// };
// export const goalsCategoriesRankAddAction = (formdata) => async (dispatch) => {
//   try {
//     const { data } = await api.addGoalsCategoriesRank(formdata);
//     dispatch(goalsCategoriesRankFetchAction(formdata?.categoryName));
//   } catch (error) {}
// };
