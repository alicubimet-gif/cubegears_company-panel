import React from 'react';
import { CrudResourcePage } from '../../components/common/CrudResourcePage';
import { resourceConfigs } from '../operations/resourceConfigs';

export const ServiceList = () => <CrudResourcePage {...resourceConfigs.services} />;
export default ServiceList;
