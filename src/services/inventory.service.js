import { stockService, getStock, getStockById, createStockItem, updateStockItem, deleteStockItem } from './stock.service';

export const getInventory = getStock;
export const getInventoryById = getStockById;
export const createInventoryItem = createStockItem;
export const updateInventoryItem = updateStockItem;
export const deleteInventoryItem = deleteStockItem;

export const inventoryService = {
  getInventory,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getAll: getInventory,
  getById: getInventoryById
};
