import { USE_MOCK_API } from '../api/apiConfig';
import { API_ENDPOINTS } from '../api/endpoints';
import apiClient from '../api/apiClient';
import {
  getMockVehicles,
  getMockVehicleById,
  addMockVehicle,
  updateMockVehicle,
  deleteMockVehicle
} from '../mock/vehicles.mock';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const getVehicles = async (params) => {
  if (USE_MOCK_API) {
    await delay();
    let result = getMockVehicles();
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(v => v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.licensePlate.toLowerCase().includes(q));
    }
    return Promise.resolve(result);
  }
  return apiClient.get(API_ENDPOINTS.VEHICLES, { params });
};

export const getVehicleById = async (id) => {
  if (USE_MOCK_API) {
    await delay();
    return Promise.resolve(getMockVehicleById(id));
  }
  return apiClient.get(`${API_ENDPOINTS.VEHICLES}/${id}`);
};

export const createVehicle = async (data) => {
  if (USE_MOCK_API) {
    await delay();
    return Promise.resolve(addMockVehicle(data));
  }
  return apiClient.post(API_ENDPOINTS.VEHICLES, data);
};

export const updateVehicle = async (id, data) => {
  if (USE_MOCK_API) {
    await delay();
    return Promise.resolve(updateMockVehicle(id, data));
  }
  return apiClient.put(`${API_ENDPOINTS.VEHICLES}/${id}`, data);
};

export const deleteVehicle = async (id) => {
  if (USE_MOCK_API) {
    await delay();
    return Promise.resolve(deleteMockVehicle(id));
  }
  return apiClient.delete(`${API_ENDPOINTS.VEHICLES}/${id}`);
};

export const vehicleService = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getAll: getVehicles,
  getById: getVehicleById,
  create: createVehicle
};
