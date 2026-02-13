// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin'
};

// Leave Status
export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
};

// Leave Types
export const LEAVE_TYPES = {
  SICK: 'sick',
  CASUAL: 'casual',
  EARNED: 'earned',
  MATERNITY: 'maternity',
  EMERGENCY: 'emergency'
};

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LEAVE: 'leave',
  HALF_DAY: 'half_day'
};

// Payroll Status
export const PAYROLL_STATUS = {
  DRAFT: 'draft',
  PROCESSED: 'processed',
  PAID: 'paid',
  HOLD: 'hold'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  API: 'yyyy-MM-dd',
  FULL: 'PPP'
};

// Messages
export const MESSAGES = {
  SUCCESS: 'Operation successful',
  ERROR: 'An error occurred. Please try again.',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  LEAVE_APPLIED: 'Leave application submitted',
  PROFILE_UPDATED: 'Profile updated successfully',
  UNAUTHORIZED: 'You are not authorized to access this resource',
  SESSION_EXPIRED: 'Your session has expired. Please login again.'
};

export default {
  USER_ROLES,
  LEAVE_STATUS,
  LEAVE_TYPES,
  ATTENDANCE_STATUS,
  PAYROLL_STATUS,
  DATE_FORMATS,
  MESSAGES
};
