import { customInterIceptors } from '../../../../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addRetention = (retentionData) => {
  return API.post('/retention', retentionData);
};
export const fetchRetention = () => {
  return API.get('/retention');
};
export const deleteRetention = (rule) => {
  return API.delete('/retention/?upperLimit='+rule.upperLimit+"&&lowerLimit="+rule.lowerLimit);
};
export const editRetention = (payload) => {
  return API.put('/retention/?upperLimit='+payload.rule.upperLimit+"&&lowerLimit="+payload.rule.lowerLimit,payload);
};

