import { getMockCategories, addMockCategory, addMockServiceType, getMockServices, addMockService } from '../mock/services.mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

export const getServiceCategories = async () => {
  if (USE_MOCK) {
    return getMockCategories();
  }
  return [];
};

export const createServiceCategory = async (data) => {
  if (USE_MOCK) {
    return addMockCategory(data);
  }
  return null;
};

export const createServiceType = async (categoryId, typeData) => {
  if (USE_MOCK) {
    return addMockServiceType(categoryId, typeData);
  }
  return null;
};

export const getServices = async () => {
  if (USE_MOCK) {
    return getMockServices();
  }
  return [];
};

export const createService = async (data) => {
  if (USE_MOCK) {
    return addMockService(data);
  }
  return null;
};

export const serviceService = {
  getServiceCategories,
  createServiceCategory,
  createServiceType,
  getServices,
  createService
};
