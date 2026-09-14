import { USE_MOCK_API } from '../api/apiConfig';
import { API_ENDPOINTS } from '../api/endpoints';
import apiClient from '../api/apiClient';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const mockSettings = {
  general: { currency: "USD ($)", timezone: "UTC (GMT+0)", appName: "CubixGear Garage" },
  company: { name: "CubixGear Motors Inc.", address: "100 Industrial Parkway", taxId: "TAX-990812" },
  billing: { plan: "Enterprise SaaS", cycle: "Annual" }
};

export const getSettings = async (category = "general") => {
  if (USE_MOCK_API) {
    await delay();
    return Promise.resolve(mockSettings[category] || mockSettings.general);
  }
  return apiClient.get(`${API_ENDPOINTS.SETTINGS}/${category}`);
};

export const updateSettings = async (category, data) => {
  if (USE_MOCK_API) {
    await delay();
    mockSettings[category] = { ...mockSettings[category], ...data };
    return Promise.resolve(mockSettings[category]);
  }
  return apiClient.put(`${API_ENDPOINTS.SETTINGS}/${category}`, data);
};

export const settingsService = {
  getSettings,
  updateSettings,
  getGeneral: () => getSettings('general'),
  getCompany: () => getSettings('company'),
  getBilling: () => getSettings('billing'),
  getUsers: () => getSettings('users'),
  getRoles: () => getSettings('roles'),
  getNotifications: () => getSettings('notifications')
};
