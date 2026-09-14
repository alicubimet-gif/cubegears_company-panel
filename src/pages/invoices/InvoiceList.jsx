import React from 'react';
import { CrudResourcePage } from '../../components/common/CrudResourcePage';
import { resourceConfigs } from '../operations/resourceConfigs';

export const InvoiceList = () => <CrudResourcePage {...resourceConfigs.invoices} />;
export default InvoiceList;
