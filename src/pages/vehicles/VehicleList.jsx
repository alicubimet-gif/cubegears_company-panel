import React from 'react';
import { CrudResourcePage } from '../../components/common/CrudResourcePage';
import { resourceConfigs } from '../operations/resourceConfigs';

export const VehicleList = () => <CrudResourcePage {...resourceConfigs.vehicles} />;
export const AddVehicle = VehicleList;
export const VehicleDetails = VehicleList;

export default VehicleList;
