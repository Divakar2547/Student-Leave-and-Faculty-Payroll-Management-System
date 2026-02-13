import { format, parseISO } from 'date-fns';
import { DATE_FORMATS } from './constants';

/**
 * Format date for display
 */
export const formatDate = (date, dateFormat = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, dateFormat);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

/**
 * Calculate days between two dates
 */
export const calculateDaysBetween = (startDate, endDate) => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Generate payslip filename
 */
export const generatePayslipFilename = (employeeId, month, year) => {
  return `Payslip_${employeeId}_${month}_${year}.pdf`;
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

/**
 * Check if user has role
 */
export const hasRole = (user, roles) => {
  if (!user || !user.role) return false;
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return roleArray.includes(user.role);
};

/**
 * Parse error message
 */
export const parseError = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An error occurred. Please try again.';
};

/**
 * Truncate text
 */
export const truncate = (text, length = 50) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export default {
  formatDate,
  calculateDaysBetween,
  validateEmail,
  validatePhone,
  generatePayslipFilename,
  formatCurrency,
  getInitials,
  hasRole,
  parseError,
  truncate,
};
