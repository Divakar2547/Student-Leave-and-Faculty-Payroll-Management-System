import axios from 'axios';
import API_BASE_URL, { API_ENDPOINTS } from '../config/config';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Auth API Services
export const authAPI = {
  login: (credentials) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),
  getProfile: () => apiClient.get(API_ENDPOINTS.AUTH.PROFILE),
  refreshToken: () => apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN),
};

// Student API Services
export const studentAPI = {
  getDashboard: () => apiClient.get(API_ENDPOINTS.STUDENT.GET_DASHBOARD),
  getProfile: () => apiClient.get(API_ENDPOINTS.STUDENT.GET_PROFILE),
  updateProfile: (data) => apiClient.put(API_ENDPOINTS.STUDENT.UPDATE_PROFILE, data),
  getLeaves: () => apiClient.get(API_ENDPOINTS.STUDENT.GET_LEAVES),
  applyLeave: (data) => apiClient.post(API_ENDPOINTS.STUDENT.APPLY_LEAVE, data),
  getLeaveBalance: () => apiClient.get(API_ENDPOINTS.STUDENT.GET_LEAVE_BALANCE),
  getAttendance: () => apiClient.get(API_ENDPOINTS.STUDENT.GET_ATTENDANCE),
  getPayslips: () => apiClient.get(API_ENDPOINTS.STUDENT.GET_PAYSLIPS),
};

// Faculty API Services
export const facultyAPI = {
  getDashboard: () => apiClient.get(API_ENDPOINTS.FACULTY.GET_DASHBOARD),
  getProfile: () => apiClient.get(API_ENDPOINTS.FACULTY.GET_PROFILE),
  updateProfile: (data) => apiClient.put(API_ENDPOINTS.FACULTY.UPDATE_PROFILE, data),
  getLeaves: () => apiClient.get(API_ENDPOINTS.FACULTY.GET_LEAVES),
  applyLeave: (data) => apiClient.post(API_ENDPOINTS.FACULTY.APPLY_LEAVE, data),
  getLeaveBalance: () => apiClient.get(API_ENDPOINTS.FACULTY.GET_LEAVE_BALANCE),
  getAttendance: () => apiClient.get(API_ENDPOINTS.FACULTY.GET_ATTENDANCE),
  getPayslips: () => apiClient.get(API_ENDPOINTS.FACULTY.GET_PAYSLIPS),
};

// Admin API Services
export const adminAPI = {
  getDashboard: () => apiClient.get(API_ENDPOINTS.ADMIN.GET_DASHBOARD),
  getUsers: () => apiClient.get(API_ENDPOINTS.ADMIN.GET_USERS),
  getLeaves: () => apiClient.get(API_ENDPOINTS.ADMIN.GET_LEAVES),
  approveLeave: (leaveId) => apiClient.put(API_ENDPOINTS.ADMIN.APPROVE_LEAVE, { leaveId }),
  rejectLeave: (leaveId, reason) => apiClient.put(API_ENDPOINTS.ADMIN.REJECT_LEAVE, { leaveId, reason }),
  getAttendance: () => apiClient.get(API_ENDPOINTS.ADMIN.GET_ATTENDANCE),
  markAttendance: (data) => apiClient.post(API_ENDPOINTS.ADMIN.MARK_ATTENDANCE, data),
  getPayroll: () => apiClient.get(API_ENDPOINTS.ADMIN.GET_PAYROLL),
  generatePayslips: () => apiClient.post(API_ENDPOINTS.ADMIN.GENERATE_PAYSLIPS),
  getPayslips: () => apiClient.get(API_ENDPOINTS.ADMIN.GET_PAYSLIPS),
};

export default apiClient;