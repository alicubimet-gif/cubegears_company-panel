import { USE_MOCK_API } from '../api/apiConfig';
import { API_ENDPOINTS } from '../api/endpoints';
import apiClient from '../api/apiClient';
import { getMockExpenses, addMockExpense } from '../mock/expenses.mock';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const getExpenses = async (params) => {
  if (USE_MOCK_API) {
    await delay();
    return Promise.resolve(getMockExpenses());
  }
  return apiClient.get(API_ENDPOINTS.EXPENSES, { params });
};

export const createExpense = async (data) => {
  if (USE_MOCK_API) {
    await delay();
    return Promise.resolve(addMockExpense(data));
  }
  return apiClient.post(API_ENDPOINTS.EXPENSES, data);
};

export const expenseService = {
  getExpenses,
  createExpense,
  getAll: getExpenses,
  create: createExpense
};
