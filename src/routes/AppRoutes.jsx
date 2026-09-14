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
import { VehicleList } from '../pages/vehicles/VehicleList';
import { ServiceList } from '../pages/services/ServiceList';
import { JobList } from '../pages/jobs/JobList';
import { JobDetails } from '../pages/jobs/JobDetails';
import { JobStatus } from '../pages/jobs/JobStatus';
import { InventoryList } from '../pages/inventory/InventoryList';
import { StockManagement } from '../pages/stock/StockManagement';
import { InvoiceList } from '../pages/invoices/InvoiceList';
import { PaymentList } from '../pages/payments/PaymentList';
import { ExpenseList } from '../pages/expenses/ExpenseList';
import { Reports } from '../pages/reports/Reports';
import { Notifications } from '../pages/notifications/Notifications';
import { Settings } from '../pages/settings/Settings';

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />

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

      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/add" element={<AddCustomer />} />
      <Route path="/customers/edit/:id" element={<EditCustomer />} />
      <Route path="/customers/:id" element={<CustomerDetails />} />

      <Route path="/vehicles" element={<VehicleList />} />
      <Route path="/vehicles/add" element={<VehicleList />} />
      <Route path="/vehicles/:id" element={<VehicleList />} />

      <Route path="/services" element={<ServiceList />} />
      <Route path="/services/new" element={<ServiceList />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/jobs/new" element={<JobList openNewModal={true} />} />
      <Route path="/jobs/add" element={<JobList openNewModal={true} />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/jobs/:id/*" element={<JobDetails />} />
      <Route path="/jobs/:id/status" element={<JobStatus />} />

      <Route path="/inventory" element={<InventoryList />} />
      <Route path="/inventory/:id" element={<InventoryList />} />
      <Route path="/stock" element={<StockManagement />} />
      <Route path="/stock/items" element={<StockManagement />} />
      <Route path="/stock/items/:itemId" element={<StockManagement />} />
      <Route path="/stock/in" element={<StockManagement />} />
      <Route path="/stock/issue" element={<StockManagement />} />
      <Route path="/stock/return" element={<StockManagement />} />
      <Route path="/stock/transfer" element={<StockManagement />} />
      <Route path="/stock/adjustments" element={<StockManagement />} />
      <Route path="/stock/reservations" element={<StockManagement />} />
      <Route path="/stock/low-stock" element={<StockManagement />} />
      <Route path="/stock/ledger" element={<StockManagement />} />
      <Route path="/stock/suppliers" element={<StockManagement />} />
      <Route path="/stock/purchases" element={<StockManagement />} />
      <Route path="/stock/count" element={<StockManagement />} />
      <Route path="/stock/reports" element={<StockManagement />} />

      <Route path="/invoices" element={<InvoiceList />} />
      <Route path="/invoices/create" element={<InvoiceList />} />
      <Route path="/payments" element={<PaymentList />} />
      <Route path="/expenses" element={<ExpenseList />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);
