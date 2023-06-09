import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addIncome = (incomeData) => {
  return API.post('income', incomeData, { 'Content-Type': 'multipart/form-data' });
};

export const fetchIncome = () => {
  return API.get('income');
};

export const fetchAllCategories = () => {
  return API.get('finance-category');
};

export const addFinanceCategory = (data) => {
  return API.post('finance-category', data);
};

export const addExpense = (incomeData) => {
  return API.post('expense', incomeData, { 'Content-Type': 'multipart/form-data' });
};

export const fetchExpense = () => {
  return API.get('expense');
};

//invoice
export const createInvoice = (payload) => {
  return API.post('/invoice', payload);
};
