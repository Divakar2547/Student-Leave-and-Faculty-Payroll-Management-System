import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './middleware/ProtectedRoute';
import useAuth from './hooks/useAuth';

// Home Page
import HomePage from './Pages/HomePage';

// Auth Pages - Removed Login and Register (now hidden)
import Unauthorized from './Pages/Unauthorized';

// Dashboard Pages
import StudentDashboard from './Pages/StudentDashboard';
import FacultyDashboard from './Pages/FacultyDashboard';
import AdminDashboard from './Pages/AdminDashboard';

// Common Pages
import ApplyLeave from './Pages/ApplyLeave';
import Attendance from './Pages/Attendance';
import Payroll from './Pages/Payroll';
import Profile from './Pages/Profile';

// Admin Pages
import UserManagement from './Pages/UserManagement';
import LeaveRequests from './Pages/LeaveRequests';
import AttendanceManagement from './Pages/AttendanceManagement';
import PayrollManagement from './Pages/PayrollManagement';

// Constants
import { USER_ROLES } from './utils/constants';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes - Hidden */}
        <Route
          path="/login"
          element={<Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={<Navigate to="/" replace />}
        />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboard Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.FACULTY}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Common Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === USER_ROLES.STUDENT ? (
                <StudentDashboard />
              ) : user?.role === USER_ROLES.FACULTY ? (
                <FacultyDashboard />
              ) : user?.role === USER_ROLES.ADMIN ? (
                <AdminDashboard />
              ) : (
                <StudentDashboard />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-leave"
          element={
            <ProtectedRoute>
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-leaves"
          element={
            <ProtectedRoute>
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payslips"
          element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave-requests"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <LeaveRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance-management"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AttendanceManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll-management"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <PayrollManagement />
            </ProtectedRoute>
          }
        />

        {/* Default Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;