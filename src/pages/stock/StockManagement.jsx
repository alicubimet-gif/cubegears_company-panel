import React from 'react';
import { CrudResourcePage } from '../../components/common/CrudResourcePage';
import { resourceConfigs } from '../operations/resourceConfigs';

export const StockManagement = () => <CrudResourcePage {...resourceConfigs.stock} />;
export default StockManagement;
