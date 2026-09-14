import React from 'react';
import { CrudResourcePage } from '../../components/common/CrudResourcePage';
import { resourceConfigs } from '../operations/resourceConfigs';

export const InventoryList = () => <CrudResourcePage {...resourceConfigs.inventory} />;
export const InventoryDetails = InventoryList;
export default InventoryList;
