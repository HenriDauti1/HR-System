import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute, AdminRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Login from "@/pages/Login";
import AccessDenied from "@/pages/AccessDenied";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

// Reports
import ActiveEmployees from "@/pages/reports/ActiveEmployees";
import DepartmentStatistics from "@/pages/reports/DepartmentStatistics";
import AttendanceSummary from "@/pages/reports/AttendanceSummary";
import ExpiringContracts from "@/pages/reports/ExpiringContracts";
import LeaveBalance from "@/pages/reports/LeaveBalance";

// Admin CRUD Pages
import RegionManagement from "@/pages/admin/RegionManagement";
import CountryManagement from "@/pages/admin/CountryManagement";
import DepartmentManagement from "@/pages/admin/DepartmentManagement";
import PositionManagement from "@/pages/admin/PositionManagement";
import EmployeeManagement from "@/pages/admin/EmployeeManagement";
import EmployeeHistoryManagement from "@/pages/admin/EmployeeHistoryManagement";
import AttendanceManagement from "@/pages/admin/AttendanceManagement";
import ContractManagement from "@/pages/admin/ContractManagement";
import PayrollManagement from "@/pages/admin/PayrollManagement";
import LeaveManagement from "@/pages/admin/LeaveManagement";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Reports */}
              <Route path="/reports/active-employees" element={<ActiveEmployees />} />
              <Route path="/reports/department-statistics" element={<DepartmentStatistics />} />
              <Route path="/reports/attendance-summary" element={<AttendanceSummary />} />
              <Route path="/reports/expiring-contracts" element={<ExpiringContracts />} />
              <Route path="/reports/leave-balance" element={<LeaveBalance />} />
              
              {/* Admin routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/regions" element={<RegionManagement />} />
                <Route path="/admin/countries" element={<CountryManagement />} />
                <Route path="/admin/departments" element={<DepartmentManagement />} />
                <Route path="/admin/positions" element={<PositionManagement />} />
                <Route path="/admin/employees" element={<EmployeeManagement />} />
                <Route path="/admin/employee-history" element={<EmployeeHistoryManagement />} />
                <Route path="/admin/attendance" element={<AttendanceManagement />} />
                <Route path="/admin/contracts" element={<ContractManagement />} />
                <Route path="/admin/payroll" element={<PayrollManagement />} />
                <Route path="/admin/leaves" element={<LeaveManagement />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
