import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();
export async function createAddCampaign(campaignName) {
  try {
    const response = await API.post(ENDPOINTS.CREATE_ADD_CAMPAIGN, campaignName);
    if (response?.status === 200) {
      toast.success('Add New campaign created successfully!');
      return response;
    } else {
      toast.error('Failed to create a project!');
      return response;
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}

export async function createMyGoal(formData) {
  try {
    const response = await API.post(ENDPOINTS.CREATE_ADD_GOAL, formData);
    if (response?.status === 200) {
      toast.success('Add New goal created successfully!');
      return response;
    } else {
      toast.error('Failed to create goal!');
      return response;
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}

export async function getMyGoalsCategory() {
  const goalCategory = await API.get(ENDPOINTS.GET_CATEGORY);
  return goalCategory;
}

export async function getMyGoalList() {
  const goalLIST = await API.get(ENDPOINTS.GET_GOALLIST);
  return goalLIST;
}

export async function notificationData(formData) {
  const response = await API.post(ENDPOINTS.ADD_NOTIFICATION, formData);
  return response;
}
export async function addDisplayUrl(url) {
  try {
    const urlData = await API.post(ENDPOINTS.ADD_DISPLAY_URL, url);
    if (urlData?.status === 200) {
      toast.success('Add New Display Url created successfully!');
      return urlData;
    } else {
      toast.error('Failed to Add Display Url!');
      return response;
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}
export async function getDisplayUrlList() {
  const displayUrlList = await API.get(ENDPOINTS.DISPLAY_URLLIST);
  return displayUrlList;
}

export async function getCampaignList() {
  const campaignlList = await API.get(ENDPOINTS.GET_CAMPAIGN_LIST);
  return campaignlList;
}
