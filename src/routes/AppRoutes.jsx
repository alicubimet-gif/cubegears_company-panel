import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { Login } from '../pages/auth/Login';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';

import { Dashboard } from '../pages/dashboard/Dashboard';
import { MyAttendance } from '../pages/attendance/MyAttendance';
import { AttendanceManager } from '../pages/attendance/AttendanceManager';
import { StaffAttendanceDetails } from '../pages/attendance-manager/StaffAttendanceDetails';
import { StaffManagement } from '../pages/employees/StaffManagement';
import { Payroll } from '../pages/staff-management/Payroll';


import { CustomerList } from '../pages/customers/CustomerList';
import { AddCustomer } from '../pages/customers/AddCustomer';
import { EditCustomer } from '../pages/customers/EditCustomer';
import { CustomerDetails } from '../pages/customers/CustomerDetails';

import { VehicleList, AddVehicle, VehicleDetails } from '../pages/vehicles/VehicleList';
import { ServiceList } from '../pages/services/ServiceList';
import { ServiceForm } from '../pages/services/ServiceForm';

import { JobList } from '../pages/jobs/JobList';
import { AddJob } from '../pages/jobs/AddJob';
import { JobDetails } from '../pages/jobs/JobDetails';
import { JobStatus } from '../pages/jobs/JobStatus';

import { InventoryList, InventoryDetails } from '../pages/inventory/InventoryList';
import { StockManagement } from '../pages/stock/StockManagement';

import { InvoiceList } from '../pages/invoices/InvoiceList';
import { CreateInvoice } from '../pages/invoices/CreateInvoice';
import { PaymentList } from '../pages/payments/PaymentList';
import { ExpenseList } from '../pages/expenses/ExpenseList';

import { Reports } from '../pages/reports/Reports';
import { Website } from '../pages/website/Website';
import { Notifications } from '../pages/notifications/Notifications';
import { Settings } from '../pages/settings/Settings';
import { ComponentsPage } from '../pages/components/ComponentsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Layout Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Attendance & HR */}
        <Route path="/my-attendance" element={<MyAttendance />} />
        <Route path="/my-attendance/calendar" element={<MyAttendance />} />
        <Route path="/my-attendance/history" element={<MyAttendance />} />
        <Route path="/my-attendance/leave" element={<MyAttendance />} />
        <Route path="/my-attendance/summary" element={<MyAttendance />} />
        <Route path="/attendance-manager" element={<Navigate to="/attendance-manager/approvals" replace />} />
        <Route path="/attendance-manager/approvals" element={<AttendanceManager />} />
        <Route path="/attendance-manager/team-review" element={<AttendanceManager />} />
        <Route path="/attendance-manager/team-review/:staffId/:date" element={<StaffAttendanceDetails />} />
        <Route path="/attendance-manager/master-records" element={<AttendanceManager />} />
        <Route path="/attendance-manager/leave-types" element={<AttendanceManager />} />
        <Route path="/attendance-manager/holidays" element={<AttendanceManager />} />
        <Route path="/attendance-manager/rules" element={<AttendanceManager />} />
        <Route path="/staff-management" element={<Navigate to="/staff-management/staff" replace />} />
        <Route path="/staff-management/staff" element={<StaffManagement />} />
        <Route path="/staff-management/roles" element={<StaffManagement />} />
        <Route path="/staff-management/payroll" element={<Navigate to="/payroll" replace />} />
        <Route path="/payroll" element={<Payroll section="dashboard" />} />
        <Route path="/payroll/salary-structure" element={<Payroll section="salary" />} />
        <Route path="/payroll/monthly" element={<Payroll section="monthly" />} />
        <Route path="/payroll/approvals" element={<Payroll section="approvals" />} />
        <Route path="/payroll/disbursal" element={<Payroll section="disbursal" />} />
        <Route path="/payroll/advances" element={<Payroll section="advances" />} />
        <Route path="/payroll/payslips" element={<Payroll section="payslips" />} />
        <Route path="/payroll/reports" element={<Payroll section="reports" />} />

        {/* Customer Directory */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/edit/:id" element={<EditCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />

        {/* Vehicles */}
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/add" element={<AddVehicle />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />

        {/* Services & Jobs */}
        <Route path="/services" element={<ServiceList />} />
        <Route path="/services/new" element={<ServiceForm />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/new" element={<JobList openNewModal={true} />} />
        <Route path="/jobs/add" element={<JobList openNewModal={true} />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:id/*" element={<JobDetails />} />
        <Route path="/jobs/:id/status" element={<JobStatus />} />

        {/* Inventory & Stock */}
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/inventory/:id" element={<InventoryDetails />} />
        <Route path="/stock" element={<StockManagement section="dashboard" />} />
        <Route path="/stock/items" element={<StockManagement section="items" />} />
        <Route path="/stock/items/:itemId" element={<StockManagement section="items" />} />
        <Route path="/stock/in" element={<StockManagement section="in" />} />
        <Route path="/stock/issue" element={<StockManagement section="issue" />} />
        <Route path="/stock/return" element={<StockManagement section="return" />} />
        <Route path="/stock/transfer" element={<StockManagement section="transfer" />} />
        <Route path="/stock/adjustments" element={<StockManagement section="adjustments" />} />
        <Route path="/stock/reservations" element={<StockManagement section="reservations" />} />
        <Route path="/stock/low-stock" element={<StockManagement section="low-stock" />} />
        <Route path="/stock/ledger" element={<StockManagement section="ledger" />} />
        <Route path="/stock/suppliers" element={<StockManagement section="suppliers" />} />
        <Route path="/stock/purchases" element={<StockManagement section="purchases" />} />
        <Route path="/stock/count" element={<StockManagement section="count" />} />
        <Route path="/stock/reports" element={<StockManagement section="reports" />} />

        {/* Finance */}
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/create" element={<CreateInvoice />} />
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/expenses" element={<ExpenseList />} />

        {/* Analytics, Website, Notifications & Settings */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/website" element={<Website />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/components" element={<ComponentsPage />} />
      </Route>

      {/* Fallback Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
