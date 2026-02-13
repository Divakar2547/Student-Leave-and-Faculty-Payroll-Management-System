// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  },
  
  // Student endpoints
  STUDENT: {
    GET_DASHBOARD: '/students/dashboard',
    GET_PROFILE: '/students/profile',
    UPDATE_PROFILE: '/students/profile',
    GET_LEAVES: '/students/leaves',
    APPLY_LEAVE: '/students/leaves/apply',
    GET_LEAVE_BALANCE: '/students/leave-balance',
    GET_ATTENDANCE: '/students/attendance',
    GET_PAYSLIPS: '/students/payslips'
  },
  
  // Faculty endpoints
  FACULTY: {
    GET_DASHBOARD: '/faculty/dashboard',
    GET_PROFILE: '/faculty/profile',
    UPDATE_PROFILE: '/faculty/profile',
    GET_LEAVES: '/faculty/leaves',
    APPLY_LEAVE: '/faculty/leaves/apply',
    GET_LEAVE_BALANCE: '/faculty/leave-balance',
    GET_ATTENDANCE: '/faculty/attendance',
    GET_PAYSLIPS: '/faculty/payslips'
  },
  
  // Admin endpoints
  ADMIN: {
    GET_DASHBOARD: '/admin/dashboard',
    GET_USERS: '/admin/users',
    GET_LEAVES: '/admin/leaves',
    APPROVE_LEAVE: '/admin/leaves/approve',
    REJECT_LEAVE: '/admin/leaves/reject',
    GET_ATTENDANCE: '/admin/attendance',
    MARK_ATTENDANCE: '/admin/attendance/mark',
    GET_PAYROLL: '/admin/payroll',
    GENERATE_PAYSLIPS: '/admin/payroll/generate-payslips',
    GET_PAYSLIPS: '/admin/payslips'
  }
};

export default API_BASE_URL;
